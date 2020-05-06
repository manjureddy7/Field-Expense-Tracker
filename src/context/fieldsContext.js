import React, { createContext, useReducer, useEffect } from "react";

import useGetFieldDetails from "../customHooks/useGetFieldDetails";
import { PADDY_COLLECTION } from "../constants/collections";

export const FieldsContext = createContext();

const initialState = {
  fieldValues: [],
  hideEditForm: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FIELDS_FROM_HOOK":
      return {
        fieldValues: [...state.fieldValues, ...action.payload],
        hideEditForm: true,
      };
    case "ADD_FIELD":
      return {
        fieldValues: [...state.fieldValues, action.payload],
        hideEditForm: true,
      };
    case "GET_FIELDS":
      return state;
    case "UPDATE_FIELD_DETAILS":
      const updatedDetails = state.fieldValues.map((fieldDetails) => {
        if (fieldDetails.uid === action.payload.uid) {
          return {
            ...fieldDetails,
            fieldName: action.payload.fieldName,
            acres: action.payload.acres,
          };
        } else {
          return fieldDetails;
        }
      });
      return {
        fieldValues: [...updatedDetails],
        hideEditForm: true,
      };
    case "DELETE_FIELD_DETAILS":
      const removedField = action.payload;
      const remainingItems = state.fieldValues.filter(
        (fieldValue) => fieldValue.uid !== removedField.uid
      );
      return {
        fieldValues: [...remainingItems],
        hideEditForm: true,
      };
    case "SHOW_EDIT_FORM":
      return {
        fieldValues: state.fieldValues,
        hideEditForm: false,
      };
    case "HIDE_EDIT_FORM":
      return {
        fieldValues: state.fieldValues,
        hideEditForm: true,
      };
    default:
      return state;
  }
};

export const FieldsContextProvider = (props) => {
  // Fields Data from custom hook
  const { loading, fieldData, error } = useGetFieldDetails(PADDY_COLLECTION);

  const [fieldsData, dispatchToField] = useReducer(reducer, initialState);

  useEffect(() => {
    if (fieldData.length > 0) {
      dispatchToField({
        type: "ADD_FIELDS_FROM_HOOK",
        payload: fieldData,
      });
    }
  }, [fieldData]);

  return (
    <FieldsContext.Provider
      value={{ fieldsData, dispatchToField, loading, error }}
    >
      {props.children}
    </FieldsContext.Provider>
  );
};
