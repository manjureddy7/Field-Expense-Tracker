import React, { useContext, useState } from "react";
import { TractorContext } from "../../context/TractorContext";
import EditTractorForm from "./EditForm";
import TotalExpenseForEachField from "./TotalExpense";

const TractorExpensesDetails = (props) => {
  const {
    tractorContextData,
    dispatchToTractor,
    deleteTractorDataFromDB,
    updateTractorDataInDB,
    loading,
    error
  } = useContext(TractorContext);

  const { showEditForm, tractorValues } = tractorContextData;
  const [editTractorValues, setEditTractorValues] = useState();

  // Edit Tractor details Collection in firestore
  const handleEditTractorData = async (updatedTractorDeatils) => {
    const finalUpdatedTractorDetails = {
      ...updatedTractorDeatils,
      totalCost:
        Number(updatedTractorDeatils.rounds) *
        Number(updatedTractorDeatils.oneRoundCost),
    };
    await updateTractorDataInDB(finalUpdatedTractorDetails);
  };

  // Show edit form details
  const handleEditForm = (editTractorDetails) => {
    setEditTractorValues(editTractorDetails);
    dispatchToTractor({
      type: "SHOW_EDIT_FORM",
    });
  };

  // Delete Tractor details in DB
  const deleteTractorDeatils = async(details) => {
    await deleteTractorDataFromDB(details)
  };

  return (
    <div>
      {showEditForm && (
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
      {loading && (
        <div style={{ textAlign: "center" }}>Loading Data....</div>
      )}
      {error && (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>
            {error}
          </p>
        </div>
      )}
      {tractorValues.length > 0 ? (
        <div className="fields-container">
          {tractorValues.map((tractorDetails, index) => (
            <div key={index} className="field-box">
              <div className="btn-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditForm(tractorDetails)}
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
