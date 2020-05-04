import React, { createContext, useReducer, useEffect } from "react";

import useGetFieldDetails from "../customHooks/useGetFieldDetails";

export const FieldsContext = createContext();

const initialState = {
  fieldValues: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_FIELDS_FROM_HOOK":
      return {
        fieldValues: [...state.fieldValues, ...action.payload],
      };
    case "ADD_FIELD":
      return {
        fieldValues: [...state.fieldValues, action.payload],
      };
    case "GET_FIELDS":
      return state.fieldValues;
    case "DELETE_FIELD_DETAILS":
      const removedField = action.payload;
      const remainingItems = state.fieldValues.filter(
        (fieldValue) => fieldValue.uid !== removedField.uid
      );
      return {
        fieldValues: [...remainingItems],
      };
    default:
      return state;
  }
};

export const FieldsContextProvider = (props) => {
  // Fields Data from custom hook
  const { loading, fieldData, error } = useGetFieldDetails("paddyFields");

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
