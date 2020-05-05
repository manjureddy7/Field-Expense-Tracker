import React from "react";

const AddFieldForm = (props) => {
  const { addField, handleInputChange, fieldData } = props;
  return (
    <div>
      <form onSubmit={addField}>
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
          <button type="submit">Add Field</button>
        </div>
      </form>
    </div>
  );
};

export default AddFieldForm;
