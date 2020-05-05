import React, { useContext } from "react";

import SingleFieldTractorExpenseCard from "./SingleFieldTractorExpenseCard";

import { TractorContext } from "../../context/tractorContext";

import { totalTractorExpesneForEachField } from "../../helpers/uniqueCard";

const TotalExpenseForEachField = () => {
  const { tractorContextData } = useContext(TractorContext);
  const { tractorValues } = tractorContextData;
  // Below code is to show total expenses for single field
  const uniqueCards = totalTractorExpesneForEachField(tractorValues);
  return (
    <div>
      <SingleFieldTractorExpenseCard uniqueCards={uniqueCards} />
    </div>
  );
};

export default TotalExpenseForEachField;
