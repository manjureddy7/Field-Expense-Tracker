import React, { useContext } from "react";

import SingleFieldTractorExpenseCard from "./SingleFieldTractorExpenseCard";

import { TractorContext } from "../../context/TractorContext";

import { totalTractorExpesneForEachField } from "../../helpers/uniqueCard";

const TotalExpenseForEachField = () => {
  const { tractorContextData } = useContext(TractorContext);
  const { tractorValues } = tractorContextData;
  // Below code is to show total expenses for single field
  const uniqueCards = totalTractorExpesneForEachField(tractorValues);
  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Each Field Tractor Expense</h2>
      <SingleFieldTractorExpenseCard uniqueCards={uniqueCards} />
    </div>
  );
};

export default TotalExpenseForEachField;
