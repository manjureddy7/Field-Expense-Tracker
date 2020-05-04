import React, { useContext } from "react";
import { TractorContext } from "../../context/tractorContext";
import SingleFieldTractorExpenseCard from "./SingleFieldTractorExpenseCard";
import FirebaseContext from "../../context/firebaseContext";

const TractorExpensesDetails = () => {
  const {
    tractorContextData,
    dispatchToTractor,
    tractorContextLoading,
    tractorContextError,
  } = useContext(TractorContext);

  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.firestore();

  // Edit Tractor details
  const editTractorDetails = (id) => {
    console.log("id is", id);
  };

  // function deleteTractorDeatils(details) {
  //   console.log("id is", details);
  // }

  const deleteTractorDeatils = (details) => {
    console.log("delete is", details);
    db.collection("tractorData")
      .doc(details.uid)
      .delete()
      .then((data) => {
        dispatchToTractor({
          type: "DELETE_TRACTOR_DETAILS",
          payload: details,
        });
      })
      .catch((error) => {
        console.log("error happened while deleting record", error);
      });
  };

  const { tractorValues } = tractorContextData;

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

  // Remove duplicate items
  const stringifiedCards = singleCard.map(JSON.stringify);
  const uniqueSetOfCards = new Set(stringifiedCards);
  const uniqueCards = Array.from(uniqueSetOfCards).map(JSON.parse);

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
              <div className="btn-actions">
                <button
                  className="edit-btn"
                  onClick={() => editTractorDetails(tractorDetails)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTractorDeatils(tractorDetails)}
                >
                  Delete
                </button>
              </div>
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
      <SingleFieldTractorExpenseCard uniqueCards={uniqueCards} />
    </div>
  );
};

export default TractorExpensesDetails;
