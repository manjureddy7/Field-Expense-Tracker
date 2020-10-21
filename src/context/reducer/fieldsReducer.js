export const initialState = {
    fieldValues: [],
    hideEditForm: true,
};
  
export const fieldsReducer = (state, action) => {
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