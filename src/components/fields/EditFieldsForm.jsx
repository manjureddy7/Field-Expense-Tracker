import React, { useState, useContext } from "react";

import { FieldsContext } from "../../context/fieldsContext";

const EditFieldForm = (props) => {
  const { handleEdit, toEditFieldDetails, hideEditForm } = props;
  const { fieldsData, dispatchToField, ...rest } = useContext(FieldsContext);
  const [fieldData, setFieldData] = useState(toEditFieldDetails);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFieldData({
      ...fieldData,
      [name]: value.toUpperCase(),
    });
  };

  // Handle updated data
  const handleEditFieldData = (e) => {
    e.preventDefault();
    dispatchToField({
      type: "HIDE_EDIT_FORM",
    });
    handleEdit(fieldData);
    setFieldData({
      ...fieldData,
      fieldName: "",
      acres: 0,
    });
    hideEditForm(false);
  };
  return (
    <div>
      <h2 className="text-center">Edit Field details</h2>
      <div className="auth-form">
        <form onSubmit={handleEditFieldData}>
          <div>
            <label>Field Name:</label>
            <input
              type="text"
              name="fieldName"
              placeholder="Field name"
              value={fieldData.fieldName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Acres:</label>
            <input
              type="number"
              name="acres"
              placeholder="Acres"
              value={fieldData.acres}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button type="submit">Update</button>
            <button
              onClick={() =>
                dispatchToField({
                  type: "HIDE_EDIT_FORM",
                })
              }
              style={{ color: "white", backgroundColor: "red" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFieldForm;
