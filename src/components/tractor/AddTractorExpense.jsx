import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/fieldsContext";
import { TractorContext } from "../../context/tractorContext";
import { firestoreDB } from "../../firebase";
import TractorExpensesDetails from "./TractorExpensesDetails";
import AddTractorForm from "./AddTractorForm";
import { TRACTOR_COLLECTION } from "../../constants/collections";

const AddTractorExpense = () => {
  const {
    fieldsData: { fieldValues },
  } = useContext(FieldsContext);
  const { tractorContextData, dispatchToTractor } = useContext(TractorContext);
  const { hideEditForm } = tractorContextData;
  const filedValuesWithName = fieldValues.map(
    (fieldValue) => fieldValue.fieldName
  );
  const finalFieldNames = [...new Set(["", ...filedValuesWithName])];

  const handleSubmitTractorData = (finalTractorData) => {
    // Send data to Firestore

    // Initialise Firestore

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

    // Send final data to firestore
    firestoreDB
      .collection(TRACTOR_COLLECTION)
      .doc(finalTractorData.uid.toString())
      .set(finalTractorData)
      .then(() => {
        // Once the action is successful, show some data to the user
        // So send this data to TractorContext or reuse existing context
        dispatchToTractor({
          type: "ADD_TRACTOR_DETAILS",
          payload: finalTractorData,
        });
        dispatchToTractor({
          type: "HIDE_EDIT_FORM",
        });
      })
      .catch((error) => {
        console.log("Cant add data to firestore", error);
      });
  };

  return (
    <div>
      {hideEditForm && (
        <div>
          <AddTractorForm
            handleSubmitTractorData={handleSubmitTractorData}
            finalFieldNames={finalFieldNames}
          />
        </div>
      )}
      <div>
        <TractorExpensesDetails finalFieldNames={finalFieldNames} />
      </div>
    </div>
  );
};

export default AddTractorExpense;
