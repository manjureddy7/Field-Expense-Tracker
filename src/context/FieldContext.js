import React, { createContext, useReducer, useEffect, useState } from "react";
import { FIELD_COLLECTION, FIELD_SUB_COLLECTION } from "../constants/collections";
import getFieldDataFromFirestore from '../customHooks/getDataFromFirestore';
import { useFirebase } from './FirebaseContext';
import { initialState, fieldsReducer } from './reducer/fieldsReducer';
import { firestoreDB } from "../firebase";


export const FieldsContext = createContext();

// Whats happening with this context
// 1. Get Data from firestore using custom hook which needs user uuid
// 2. Then create useEffect which will run whenever data from hook changes
// 3. Dispacth an action to update initial state from useEffect
// 4. Export data and dispatch handler to children components
// 5. This Context will take care of doing Adding/Updating/Delete of records.

export const FieldsContextProvider = (props) => {

  const { userUID } = useFirebase();
  const { dbdata } = getFieldDataFromFirestore(FIELD_COLLECTION, userUID, FIELD_SUB_COLLECTION);
  const [fieldsData, dispatchToField] = useReducer(fieldsReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Run this effect for the first load time to get data from FIRESTORE
  useEffect(() => {
    if (dbdata.length > 0) {
      dispatchToField({
        type: "ADD_FIELDS_FROM_HOOK",
        payload: dbdata,
      });
    }
  }, [dbdata]);

  // Add Field
  const addFieldDataToDB = async (fieldDetails) => {
    try {
      setLoading(true);
      await firestoreDB
            .collection(FIELD_COLLECTION)
            .doc(userUID)
            .collection(FIELD_SUB_COLLECTION)
            .doc(fieldDetails.uid)
            .set(fieldDetails)
      dispatchToField({
        type: "ADD_FIELD",
        payload: fieldDetails,
      });
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError('Unable to Add Fields to Database')
    }
  }

  // Update Field
  const updateFieldDetailsInDB = async (updatedValues) => {
    try {
      setLoading(true);
      await firestoreDB
          .collection(FIELD_COLLECTION)
          .doc(userUID)
          .collection(FIELD_SUB_COLLECTION)
          .doc(updatedValues.uid)
          .update({...updatedValues})
      dispatchToField({
        type: "UPDATE_FIELD_DETAILS",
        payload: updatedValues,
      });
      setLoading(false);
    } catch(error) {
      setLoading(false);
      setError('Unable to Update Fields in Database')
    }
  }

  // Delete Field details
  const deleteFieldDetails = async (fieldDetails) => {
    try {
      setLoading(true);
      await firestoreDB
            .collection(FIELD_COLLECTION)
            .doc(userUID)
            .collection(FIELD_SUB_COLLECTION)
            .doc(fieldDetails.uid)
            .delete()
      dispatchToField({
        type: "DELETE_FIELD_DETAILS",
        payload: fieldDetails,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Unable to Delete Fields in Database')
    }
  }

  const value = {
    fieldsData,
    dispatchToField,
    addFieldDataToDB,
    updateFieldDetailsInDB,
    deleteFieldDetails,
    loading,
    error
  }

  return (
    <FieldsContext.Provider
      value={value}
    >
      {props.children}
    </FieldsContext.Provider>
  );
};
