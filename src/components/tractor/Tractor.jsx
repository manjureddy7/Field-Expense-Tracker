import React from "react";
import AddTractorExpense from "./AddTractorExpense";
import { TractorContextProvider } from "../../context/TractorContext";

const Tractor = () => {
  return (
    <TractorContextProvider>
      <AddTractorExpense />
    </TractorContextProvider>
  );
};

export default Tractor;
