import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/FieldContext";
import EditFieldForm from "./EditFieldsForm";
import { getTotalAcres } from './helper';
import Loader from "../loader";

const FieldsDetails = () => {
  const [editFieldValues, setEditFieldValues] = useState();
  const { 
        fieldsData, 
        dispatchToField, 
        updateFieldDetailsInDB, 
        deleteFieldDetails, 
        loading, 
        error 
      } = useContext(FieldsContext);
  const { fieldValues, hideEditForm: hideEditFieldForm } = fieldsData;

  // Edit field in firestore
  const updateField = async (updatedValues) => {
    await updateFieldDetailsInDB(updatedValues);
  };

  // Update local edit field state
  const editFieldDetails = (field) => {
    setEditFieldValues(field);
    dispatchToField({
      type: "SHOW_EDIT_FORM",
    });
  };

  // Delete Field details in Firestore
  const deleteFieldDeatils = async (fieldDetails) => {
    await deleteFieldDetails(fieldDetails)
  };

  return (
    <div>
      {loading && <div style={{ textAlign: "center" }}><Loader /></div>}
      {error && (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>
            {error}
          </p>
        </div>
      )}
      <div>
        {!hideEditFieldForm && (
          <EditFieldForm
            toEditFieldDetails={editFieldValues}
            handleEdit={updateField}
          />
        )}
      </div>
      <div className="total-acres">
        <span>Total Acres: {getTotalAcres(fieldValues)}</span>
        <button className="reload-btn" onClick={() => window.location.reload()}>Reload</button>
      </div>
      {fieldValues.length > 0 ? (
        <div className="fields-container">
          {fieldValues.map((field) => (
            <div key={field.uid} className="field-box">
              <div className="btn-actions">
                <button
                  className="edit-btn"
                  onClick={() => editFieldDetails(field)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteFieldDeatils(field)}
                >
                  Delete
                </button>
              </div>
              <p>Field Name: {field.fieldName}</p>
              <p>Acres: {field.acres}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-fields">
          <p>No fields added yet. Please add some fields</p>
        </div>
      )}
    </div>
  );
};

export default FieldsDetails;
