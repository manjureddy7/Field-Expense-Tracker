export const initialState = {
    tractorValues: [],
    showEditForm: false,
};
  
export const tractorReducer = (state, action) => {
    switch (action.type) {
        case "GET_TRACTOR_EXPENSE_DETAILS":
        return state;
        case "ADD_TRACTOR_EXPENSE_DETAILS_FROM_HOOK":
        return {
            tractorValues: [...state.tractorValues, ...action.payload],
            showEditForm: false,
        };
        case "ADD_TRACTOR_DETAILS":
        return {
            tractorValues: [...state.tractorValues, action.payload],
            showEditForm: false
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
            showEditForm: false,
        };
        case "DELETE_TRACTOR_DETAILS":
        const removedField = action.payload;
        const remainingItems = state.tractorValues.filter(
            (tractorValue) => tractorValue.uid !== removedField.uid
        );
        return {
            tractorValues: [...remainingItems],
            showEditForm: false,
        };
        case "SHOW_EDIT_FORM":
        return {
            tractorValues: state.tractorValues,
            showEditForm: true,
        };
        case "HIDE_EDIT_FORM":
        return {
            tractorValues: state.tractorValues,
            showEditForm: false,
        };
        default:
        return state;
    }
};