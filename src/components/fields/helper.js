// Get Total Acres

const arrayReducer = (accumulator, currentValue) => accumulator + currentValue;
export const getTotalAcres = (fieldValues) => {
    return fieldValues
            .map((fieldValue) => Number(fieldValue.acres))
            .reduce(arrayReducer, 0);
}