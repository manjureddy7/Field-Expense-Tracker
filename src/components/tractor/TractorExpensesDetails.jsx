import React, { useContext, useState } from "react";
import { TractorContext } from "../../context/tractorContext";
import FirebaseContext from "../../context/FirebaseContext";
import EditTractorForm from "./EditForm";
import TotalExpenseForEachField from "./TotalExpense";
import { TRACTOR_COLLECTION } from "../../constants/collections";

const TractorExpensesDetails = (props) => {
  const {
    tractorContextData,
    dispatchToTractor,
    tractorContextLoading,
    tractorContextError,
  } = useContext(TractorContext);
  const { hideEditForm } = tractorContextData;

  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.firestore();

  const [editTractorValues, setEditTractorValues] = useState();

  // Edit Tractor details Collection in firestore
  const handleEditTractorData = (updatedTractorDeatils) => {
    const finalUpdatedTractorDetails = {
      ...updatedTractorDeatils,
      totalCost:
        Number(updatedTractorDeatils.rounds) *
        Number(updatedTractorDeatils.oneRoundCost),
    };
    db.collection(TRACTOR_COLLECTION)
      .doc(finalUpdatedTractorDetails.uid)
      .set(finalUpdatedTractorDetails)
      .then((data) => {
        dispatchToTractor({
          type: "UPDATE_TRACTOR_DETAILS",
          payload: finalUpdatedTractorDetails,
        });
      })
      .catch((error) => {
        console.log("error happened while updating record", error);
      });
  };

  // Show edit form details
  const toggleEditForm = (editTractorDetails) => {
    setEditTractorValues(editTractorDetails);
    dispatchToTractor({
      type: "SHOW_EDIT_FORM",
    });
  };

  // function deleteTractorDeatils(details) {
  //   console.log("id is", details);
  // }

  const deleteTractorDeatils = (details) => {
    db.collection(TRACTOR_COLLECTION)
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

  return (
    <div>
      {!hideEditForm && (
        <div>
          <EditTractorForm
            handleSubmitTractorData={handleEditTractorData}
            finalFieldNames={props.finalFieldNames}
            editedTractorDetails={editTractorValues}
          />
        </div>
      )}
      <hr />
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
                  onClick={() => toggleEditForm(tractorDetails)}
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
      <TotalExpenseForEachField />
    </div>
  );
};

export default TractorExpensesDetails;
