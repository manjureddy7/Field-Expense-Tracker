import React, { createContext, useReducer, useEffect } from "react";
import useGetFieldDetails from "../customHooks/useGetFieldDetails";
import { LABOUR_COLLECTION } from "../constants/collections";

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
  // Get Data from hook
  // Fields Data from custom hook
  const {
    loading: labourContextLoading,
    fieldData: labourHookData,
    error: labourContextError,
  } = useGetFieldDetails(LABOUR_COLLECTION);

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
