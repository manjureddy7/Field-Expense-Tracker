// Helper method to provide unique card which in return provide]
// total tractor expense for each field

const arrayReducer = (accumulator, currentValue) => accumulator + currentValue;

const getTotalSum = (fieldName, tractorValues, arrayReducer) => {
  return tractorValues
    .filter((card) => card.fieldsName === fieldName)
    .map((totalCostCard) => totalCostCard.totalCost)
    .reduce(arrayReducer, 0);
};

export const totalTractorExpesneForEachField = (tractorValues) => {
  const singleCard = [];

  tractorValues.map((card) => {
    return singleCard.push({
      fieldName: card.fieldsName,
      totalCost: getTotalSum(card.fieldsName, tractorValues, arrayReducer),
    });
  });

  // Remove duplicate items
  const stringifiedCards = singleCard.map(JSON.stringify);
  const uniqueSetOfCards = new Set(stringifiedCards);
  const uniqueCards = Array.from(uniqueSetOfCards).map(JSON.parse);
  return uniqueCards;
};
