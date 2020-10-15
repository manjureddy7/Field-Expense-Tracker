import React, { useContext } from "react";
import { LabourContext } from "../../context/labourContext";
import AddLabourForm from "./AddLabourForm";
import FirebaseContext from "../../context/FirebaseContext";
import { LABOUR_COLLECTION } from "../../constants/collections";
import LabourDetails from "./LabourDetails";

const Labour = () => {
  const { labourContextdata, dispatchToLabour } = useContext(LabourContext);
  const { labourValues } = labourContextdata;
  const firebaseContext = useContext(FirebaseContext);

  const handleSubmitLabourData = (finalLabourExpense) => {
    // Send final data to firestore
    const db = firebaseContext.firestore();
    db.collection(LABOUR_COLLECTION)
      .doc(finalLabourExpense.uid.toString())
      .set(finalLabourExpense)
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
      <AddLabourForm handleSubmitLabourData={handleSubmitLabourData} />
      <hr />
      <LabourDetails labourValues={labourValues} />
    </div>
  );
};

export default Labour;
