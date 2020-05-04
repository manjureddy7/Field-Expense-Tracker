import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/fieldsContext";
import { TractorContext } from "../../context/tractorContext";
import FirebaseContext from "../../context/firebaseContext";
import TractorExpensesDetails from "./TractorExpensesDetails";

const AddTractorExpense = () => {
  const firebaseContext = useContext(FirebaseContext);
  const { fieldsData } = useContext(FieldsContext);
  const { _, dispatchToTractor } = useContext(TractorContext);

  const { fieldValues } = fieldsData;
  const totalFieldNames = fieldValues.map((fieldValue) => fieldValue.fieldName);
  const finalFieldNames = ["", ...totalFieldNames];

  const initialTractorValues = {
    tractorAction: "",
    rounds: 0,
    oneRoundCost: 0,
    fieldsName: "",
    date: "",
  };

  const [tractorData, setTractorData] = useState(initialTractorValues);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setTractorData({
      ...tractorData,
      [name]: value.toUpperCase(),
    });
  };

  const handleSubmitTractorData = (e) => {
    e.preventDefault();

    console.log("final tractor data", tractorData);

    // Send data to Firestore

    // Initialise Firestore
    const db = firebaseContext.firestore();

    // TODO:: To get date in 10-Aug-2010 format
    // const expenseDate = new Date(initialTractorValues.date);
    // const expenseDateFomat = new Intl.DateTimeFormat("en", {
    //   month: "short",

    //   day: "2-digit",
    //   year: "numeric",
    // });
    // const [
    //   { value: month },
    //   ,
    //   { value: day },
    //   ,
    //   { value: year },
    // ] = expenseDateFomat.formatToParts(expenseDate);

    const finalTractorData = {
      ...tractorData,
      uid: new Date().getTime().toString(),
      // expenseDateFormat: `${day}-${month}-${year}`,
      totalCost: Number(tractorData.rounds) * Number(tractorData.oneRoundCost),
    };

    // Send final data to firestore
    db.collection("tractorData")
      .doc(finalTractorData.uid.toString())
      .set(finalTractorData)
      .then((data) => {
        // Once the action is successful, show some data to the user
        // So send this data to TractorContext or reuse existing context
        dispatchToTractor({
          type: "ADD_TRACTOR_DETAILS",
          payload: finalTractorData,
        });
        setTractorData({
          ...tractorData,
          tractorAction: "",
          rounds: 0,
          oneRoundCost: 0,
          date: "",
        });
      })
      .catch((error) => {
        console.log("Cant add data to firestore", error);
        setTractorData({
          ...tractorData,
          tractorAction: "",
          rounds: 0,
          oneRoundCost: 0,
          date: "",
        });
      });
  };

  return (
    <div>
      <h2 className="tractor-heading">Add details of tractor expense</h2>
      <form onSubmit={handleSubmitTractorData}>
        <div className="tractor-form">
          <div className="tractor-form-action">
            <label>Action Type: </label>
            <input
              type="text"
              name="tractorAction"
              value={tractorData.tractorAction}
              placeholder="Type of tractor action"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-rounds">
            <label>Rounds: </label>
            <input
              type="number"
              name="rounds"
              value={tractorData.rounds}
              placeholder="Rounds of tractor"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-expense">
            <label>Each Round Expense: </label>
            <input
              type="number"
              name="oneRoundCost"
              value={tractorData.oneRoundCost}
              placeholder="Each round expense"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-select">
            <label>Select Field: </label>
            <select name="fieldsName" onChange={handleInputChange}>
              {finalFieldNames.length > 0 &&
                finalFieldNames.map((field) => (
                  <option value={field} key={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>
          <div className="tractor-form-date">
            <label>Date:</label>
            <input
              type="date"
              placeholder="date"
              name="date"
              value={tractorData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-button">
            <button type="submit">Add Tractor expense</button>
          </div>
        </div>
      </form>
      <p className="total-expense">
        Total Expense for thid field is -
        <span style={{ color: "red" }}>
          {" "}
          {Number(tractorData.rounds) * Number(tractorData.oneRoundCost)}
        </span>
      </p>
      <TractorExpensesDetails />
    </div>
  );
};

export default AddTractorExpense;
