import React, { createContext, useReducer, useEffect } from "react";

import useGetFieldDetails from "../customHooks/useGetFieldDetails";

export const TractorContext = createContext();

const initialState = {
  tractorValues: [],
};

const tractorReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRACTOR_EXPENSE_DETAILS":
      return state.tractorValues;
    case "ADD_TRACTOR_EXPENSE_DETAILS_FROM_HOOK":
      return {
        tractorValues: [...state.tractorValues, ...action.payload],
      };
    case "ADD_TRACTOR_DETAILS":
      return {
        tractorValues: [...state.tractorValues, action.payload],
      };
    default:
      return state;
  }
};

export const TractorContextProvider = (props) => {
  // Fields Data from custom hook
  const {
    loading: tractorContextLoading,
    fieldData: tractorHookData,
    error: tractorContextError,
  } = useGetFieldDetails("tractorData");

  const [tractorContextData, dispatchToTractor] = useReducer(
    tractorReducer,
    initialState
  );

  useEffect(() => {
    if (tractorHookData.length > 0) {
      dispatchToTractor({
        type: "ADD_TRACTOR_EXPENSE_DETAILS_FROM_HOOK",
        payload: tractorHookData,
      });
    }
  }, [tractorHookData]);

  return (
    <TractorContext.Provider
      value={{
        tractorContextData,
        dispatchToTractor,
        tractorContextLoading,
        tractorContextError,
      }}
    >
      {props.children}
    </TractorContext.Provider>
  );
};
