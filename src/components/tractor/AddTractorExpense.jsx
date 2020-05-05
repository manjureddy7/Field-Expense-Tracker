import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/fieldsContext";
import { TractorContext } from "../../context/tractorContext";
import FirebaseContext from "../../context/firebaseContext";
import TractorExpensesDetails from "./TractorExpensesDetails";
import AddTractorForm from "./AddTractorForm";

const AddTractorExpense = () => {
  const firebaseContext = useContext(FirebaseContext);
  const { fieldsData } = useContext(FieldsContext);
  const { tractorContextData, dispatchToTractor, ...rest } = useContext(
    TractorContext
  );
  const { hideEditForm } = tractorContextData;
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
      {hideEditForm && (
        <div>
          <h2 className="tractor-heading">Add details of tractor expense</h2>
          <AddTractorForm
            handleInputChange={handleInputChange}
            handleSubmitTractorData={handleSubmitTractorData}
            tractorData={tractorData}
            finalFieldNames={finalFieldNames}
          />
          <p className="total-expense">
            Total Expense for thid field is -
            <span style={{ color: "red" }}>
              {" "}
              {Number(tractorData.rounds) * Number(tractorData.oneRoundCost)}
            </span>
          </p>
        </div>
      )}
      <TractorExpensesDetails finalFieldNames={finalFieldNames} />
    </div>
  );
};

export default AddTractorExpense;
