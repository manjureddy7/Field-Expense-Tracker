import React, { createContext, useReducer, useEffect } from "react";

import useGetFieldDetails from "../customHooks/useGetFieldDetails";

export const TractorContext = createContext();

const initialState = {
  tractorValues: [],
  hideEditForm: true,
};

const tractorReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRACTOR_EXPENSE_DETAILS":
      return state.tractorValues;
    case "ADD_TRACTOR_EXPENSE_DETAILS_FROM_HOOK":
      return {
        tractorValues: [...state.tractorValues, ...action.payload],
        hideEditForm: true,
      };
    case "ADD_TRACTOR_DETAILS":
      return {
        tractorValues: [...state.tractorValues, action.payload],
      };
    case "UPDATE_TRACTOR_DETAILS":
      const updatedDetails = state.tractorValues.map((tractorDeatils) => {
        if (tractorDeatils.uid === action.payload.uid) {
          return {
            ...tractorDeatils,
            date: action.payload.date,
            fieldsName: action.payload.fieldsName,
            oneRoundCost: action.payload.oneRoundCost,
            rounds: action.payload.rounds,
            totalCost: action.payload.totalCost,
            tractorAction: action.payload.tractorAction,
          };
        } else {
          return tractorDeatils;
        }
      });
      return {
        tractorValues: [...updatedDetails],
        hideEditForm: true,
      };
    case "DELETE_TRACTOR_DETAILS":
      const removedField = action.payload;
      const remainingItems = state.tractorValues.filter(
        (tractorValue) => tractorValue.uid !== removedField.uid
      );
      return {
        tractorValues: [...remainingItems],
        hideEditForm: true,
      };
    case "SHOW_EDIT_FORM":
      return {
        tractorValues: state.tractorValues,
        hideEditForm: false,
      };
    case "HIDE_EDIT_FORM":
      return {
        tractorValues: state.tractorValues,
        hideEditForm: true,
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
