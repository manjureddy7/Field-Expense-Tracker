import React from "react";

const AddFieldForm = (props) => {
  const { addField, handleInputChange, fieldData } = props;
  return (
    <div className="auth-form">
      <form onSubmit={addField}>
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
        <div style={{ width: "105%", marginTop: "10px" }}>
          <button type="submit">Add Field</button>
        </div>
      </form>
    </div>
  );
};

export default AddFieldForm;
