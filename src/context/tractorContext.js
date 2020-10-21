import React, { createContext, useReducer, useEffect, useState } from "react";
import getTractorDataFromFirestore from "../customHooks/getDataFromFirestore";
import { useFirebase } from './FirebaseContext';
import { TRACTOR_COLLECTION, TRACTOR_SUB_COLLECTION } from "../constants/collections";
import { tractorReducer, initialState } from './reducer/tractorReducer';
import { firestoreDB } from "../firebase";

export const TractorContext = createContext();

export const TractorContextProvider = (props) => {

  const { userUID } = useFirebase();
  const { dbdata } = getTractorDataFromFirestore(TRACTOR_COLLECTION, userUID, TRACTOR_SUB_COLLECTION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [tractorContextData, dispatchToTractor] = useReducer(
    tractorReducer,
    initialState
  );

  useEffect(() => {
    if (dbdata.length > 0) {
      dispatchToTractor({
        type: "ADD_TRACTOR_EXPENSE_DETAILS_FROM_HOOK",
        payload: dbdata,
      });
    }
  }, [dbdata]);

  // Add Tractor Data to Firestore
  const addTractorDetailsToDB = async (tractorDetails) => {
    try {
      setLoading(true);
      await firestoreDB
            .collection(TRACTOR_COLLECTION)
            .doc(userUID)
            .collection(TRACTOR_SUB_COLLECTION)
            .doc(tractorDetails.uid)
            .set(tractorDetails)
            .then(() => {
              dispatchToTractor({
                type: "ADD_TRACTOR_DETAILS",
                payload: tractorDetails,
              })
            })
      setLoading(false);
    }
    catch(error) {
      setError("Unable to add Tractor Details to Firestore")
      setLoading(false);
    }
  }

  // Update Tractor Data in Firestore
  const updateTractorDataInDB = async (finalUpdatedTractorDetails) => {
    try {
      setLoading(true)
      await firestoreDB
            .collection(TRACTOR_COLLECTION)
            .doc(userUID)
            .collection(TRACTOR_SUB_COLLECTION)
            .doc(finalUpdatedTractorDetails.uid)
            .update({...finalUpdatedTractorDetails})
            .then((data) => {
              dispatchToTractor({
                type: "UPDATE_TRACTOR_DETAILS",
                payload: finalUpdatedTractorDetails,
              });
          })
      setLoading(false)
    } catch (error) {
      setError("Unable to update Tractor Details in Firestore");
      setLoading(false);
    }
  }

  // Delete Tractor Data in Firestore
  const deleteTractorDataFromDB = async (details) => {
    try {
      setLoading(true)
      await firestoreDB
            .collection(TRACTOR_COLLECTION)
            .doc(userUID)
            .collection(TRACTOR_SUB_COLLECTION)
            .doc(details.uid)
            .delete()
            .then((data) => {
              dispatchToTractor({
                type: "DELETE_TRACTOR_DETAILS",
                payload: details,
              });
            })
      setLoading(false);
    } catch (error) {
      setError("Unable to Delete Tractor Details in Firestore");
      setLoading(false);
    }
  }
  const value = {
    loading,
    error,
    tractorContextData,
    dispatchToTractor,
    addTractorDetailsToDB,
    updateTractorDataInDB,
    deleteTractorDataFromDB
  }

  return (
    <TractorContext.Provider
      value={value}
    >
      {props.children}
    </TractorContext.Provider>
  );
};
