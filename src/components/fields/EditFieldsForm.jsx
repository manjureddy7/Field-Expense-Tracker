import React, { useState } from "react";

const EditFieldForm = (props) => {
  const { handleEdit, toEditFieldDetails, hideEditForm } = props;

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
      <form onSubmit={handleEditFieldData}>
        <div className="field-form">
          <div className="field-form-name">
            <label>Field Name:</label>
            <input
              type="text"
              name="fieldName"
              placeholder="Field name"
              value={fieldData.fieldName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-form-acres">
            <label>Acres:</label>
            <input
              type="number"
              name="acres"
              placeholder="Acres"
              value={fieldData.acres}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-form-button">
            <button type="submit">Update</button>
            <button
              style={{ backgroundColor: "rosybrown" }}
              onClick={() => hideEditForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditFieldForm;
