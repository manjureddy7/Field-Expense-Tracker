import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/fieldsContext";
import FirebaseContext from "../../context/firebaseContext";
import EditFieldForm from "./EditFieldsForm";

const FieldsDetails = () => {
  const [showEditFieldForm, setShowEditFieldForm] = useState(false);
  const [editFieldValues, setEditFieldValues] = useState();
  const { fieldsData, dispatchToField, loading, error } = useContext(
    FieldsContext
  );
  const { fieldValues, hideEditForm: hideEditFieldForm } = fieldsData;

  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.firestore();

  // Edit field
  const handleEdit = (fieldValue) => {
    console.log("form value is", fieldValue);
    db.collection("paddyFields")
      .doc(fieldValue.uid)
      .set(fieldValue)
      .then((data) => {
        dispatchToField({
          type: "UPDATE_FIELD_DETAILS",
          payload: fieldValue,
        });
      })
      .catch((error) => {
        console.log("error happened while updating field record", error);
      });
  };
  const editFieldDetails = (field) => {
    setEditFieldValues(field);
    setShowEditFieldForm(true);
    dispatchToField({
      type: "SHOW_EDIT_FORM",
    });
  };

  const hideEditForm = (value) => {
    setShowEditFieldForm(value);
  };

  // Delete Field
  const deleteFieldDeatils = (details) => {
    db.collection("paddyFields")
      .doc(details.uid)
      .delete()
      .then((data) => {
        dispatchToField({
          type: "DELETE_FIELD_DETAILS",
          payload: details,
        });
      })
      .catch((error) => {
        console.log("error happened while deleting record", error);
      });
  };

  // Edit and update Field

  // Total Acres
  const arrayReducer = (accumulator, currentValue) =>
    accumulator + currentValue;
  const totalAcres = fieldValues
    .map((fieldValue) => Number(fieldValue.acres))
    .reduce(arrayReducer, 0);

  return (
    <div>
      {loading && <div style={{ textAlign: "center" }}>Loading Data....</div>}
      {error && (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>
            Something bad happened...!!!
          </p>
        </div>
      )}
      <div>
        {!hideEditFieldForm && (
          <EditFieldForm
            hideEditForm={hideEditForm}
            toEditFieldDetails={editFieldValues}
            handleEdit={handleEdit}
          />
        )}
      </div>
      <div className="total-acres">
        <p>Total Acres: {totalAcres}</p>
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
