import React, { useState } from "react";

const EditTractorForm = (props) => {
  const {
    handleSubmitTractorData,
    finalFieldNames,
    editedTractorDetails,
    hideEditForm,
  } = props;

  const [tractorData, setTractorData] = useState(editedTractorDetails);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setTractorData({
      ...tractorData,
      [name]: value.toUpperCase(),
    });
  };

  // Handle updated data
  const handleEditTractorData = (e) => {
    e.preventDefault();
    handleSubmitTractorData(tractorData);
    setTractorData({
      ...tractorData,
      tractorAction: "",
      rounds: 0,
      oneRoundCost: 0,
      date: "",
    });
    hideEditForm(false);
  };
  return (
    <div>
      <h2 className="text-center">Edit Tractor details</h2>
      <form onSubmit={handleEditTractorData}>
        <div className="tractor-form">
          <div className="tractor-form-action">
            <label>Action Type: </label>
            <input
              type="text"
              name="tractorAction"
              value={tractorData.tractorAction}
              placeholder="Type of tractor action"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-rounds">
            <label>Rounds: </label>
            <input
              type="number"
              name="rounds"
              value={tractorData.rounds}
              placeholder="Rounds of tractor"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-expense">
            <label>Each Round Expense: </label>
            <input
              type="number"
              name="oneRoundCost"
              value={tractorData.oneRoundCost}
              placeholder="Each round expense"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-select">
            <label>Select Field: </label>
            <select name="fieldsName" onChange={handleInputChange}>
              {finalFieldNames.length > 0 &&
                finalFieldNames.map((field) => (
                  <option value={field} key={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>
          <div className="tractor-form-date">
            <label>Date:</label>
            <input
              type="date"
              placeholder="date"
              name="date"
              value={tractorData.date}
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

export default EditTractorForm;
