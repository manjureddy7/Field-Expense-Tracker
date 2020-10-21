import React, { createContext, useReducer, useEffect } from "react";
import useDataFromFirestore from "../customHooks/getDataFromFirestore";
import { LABOUR_COLLECTION } from "../constants/collections";
import { useFirebase } from '../context/FirebaseContext';

export const LabourContext = createContext();

const initialState = {
  labourValues: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LABOUR_EXPENSE_DETAILS_FROM_HOOK":
      return {
        labourValues: [...state.labourValues, ...action.payload],
      };
    case "ADD_LABOUR_FIELD":
      return {
        labourValues: [...state.labourValues, action.payload],
      };
    default:
      return state;
  }
};

export const LabourContextProvider = (props) => {

  // On the initial load get Data from Firestore using uuid of user
  const { userUID } = useFirebase();
  const {
    loading: labourContextLoading,
    fieldData: labourHookData,
    error: labourContextError,
  } = useDataFromFirestore(LABOUR_COLLECTION,userUID, "labour");

  const [labourContextdata, dispatchToLabour] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (labourHookData.length > 0) {
      dispatchToLabour({
        type: "ADD_LABOUR_EXPENSE_DETAILS_FROM_HOOK",
        payload: labourHookData,
      });
    }
  }, [labourHookData]);

  return (
    <LabourContext.Provider
      value={{
        labourContextdata,
        dispatchToLabour,
        labourContextLoading,
        labourContextError,
      }}
    >
      {props.children}
    </LabourContext.Provider>
  );
};
