import React, { useContext } from "react";
import { LabourContext } from "../../context/labourContext";
import AddLabourForm from "./AddLabourForm";
import { LABOUR_COLLECTION } from "../../constants/collections";
import LabourDetails from "./LabourDetails";
import { firestoreDB } from "../../firebase";
import { FieldsContext } from "../../context/FieldContext";
import { useFirebase } from "../../context/FirebaseContext";

const Labour = () => {
  const { labourContextdata, dispatchToLabour } = useContext(LabourContext);
  const { labourValues } = labourContextdata;
  const { fieldsData } = useContext(FieldsContext);
  const { fieldValues } = fieldsData;
  const totalFieldNames = [
    "",
    ...new Set(fieldValues.map((fieldValue) => fieldValue.fieldName)),
  ];
  const { userUID } = useFirebase();

  const handleSubmitLabourData = (finalLabourExpense) => {
    // Send final data to firestore
    firestoreDB
      .collection(LABOUR_COLLECTION)
      .doc(userUID)
      .collection("labour")
      .add(finalLabourExpense)
      .then(() => {
        // Once the action is successful, show some data to the user
        // So send this data to TractorContext or reuse existing context
        dispatchToLabour({
          type: "ADD_LABOUR_FIELD",
          payload: finalLabourExpense,
        });
      })
      .catch((error) => {
        console.log("Cant add data to firestore", error);
      });
  };
  return (
    <div>
      <AddLabourForm
        handleSubmitLabourData={handleSubmitLabourData}
        totalFieldNames={totalFieldNames}
      />
      <hr />
      <LabourDetails labourValues={labourValues} />
    </div>
  );
};

export default Labour;
