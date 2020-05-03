import React, { useContext } from "react";
import { TractorContext } from "../context/tractorContext";
import SingleFieldExpense from "./SingleFieldExpense";

const TractorExpensesDetails = () => {
  const {
    tractorContextData,
    dispatchToTractor,
    tractorContextLoading,
    tractorContextError,
  } = useContext(TractorContext);
  const { tractorValues } = tractorContextData;
  console.log("TRACTOR VALUES ARE", tractorValues);

  const singleCard = [];
  const arrayReducer = (accumulator, currentValue) =>
    accumulator + currentValue;
  const getTotalSum = (fieldName) => {
    return tractorValues
      .filter((card) => card.fieldsName === fieldName)
      .map((totalCostCard) => totalCostCard.totalCost)
      .reduce(arrayReducer, 0);
  };

  tractorValues.map((card) => {
    singleCard.push({
      fieldName: card.fieldsName,
      totalCost: getTotalSum(card.fieldsName),
    });
  });

  const stringifiedCards = singleCard.map(JSON.stringify);

  const uniqueSetOfCards = new Set(stringifiedCards);
  const uniqueCards = Array.from(uniqueSetOfCards).map(JSON.parse);
  const renderUniqueCards = () => {
    return (
      <div className="unique-cards">
        {uniqueCards.map((uniqueCard) => (
          <div key={uniqueCard.totalCost} className="unique-card">
            <p>Field Name: {uniqueCard.fieldName}</p>
            <p>Total Cost: {uniqueCard.totalCost}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h2 className="tractor-heading">Tractor expense details</h2>
      {tractorContextLoading && (
        <div style={{ textAlign: "center" }}>Loading Data....</div>
      )}
      {tractorContextError && (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>
            Something bad happened...!!!
          </p>
        </div>
      )}
      {tractorValues.length > 0 ? (
        <div className="fields-container">
          {tractorValues.map((tractorDetails) => (
            <div key={tractorDetails.uid} className="field-box">
              <p>Field Name: {tractorDetails.fieldsName}</p>
              <p>Total Cost: {tractorDetails.totalCost}</p>
              <p>Action Type: {tractorDetails.tractorAction}</p>
              <p>Rounds: {tractorDetails.rounds}</p>
              <p>One Round Cost: {tractorDetails.oneRoundCost}</p>
              <p>Date: {tractorDetails.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-fields">
          <p>No fields added yet. Please add some fields</p>
        </div>
      )}
      <hr />

      <hr />
      {renderUniqueCards()}
    </div>
  );
};

export default TractorExpensesDetails;
