import React from "react";

const AddTractorForm = (props) => {
  const {
    handleInputChange,
    handleSubmitTractorData,
    tractorData,
    finalFieldNames,
  } = props;
  return (
    <div>
      <form onSubmit={handleSubmitTractorData}>
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
          <div className="tractor-form-button">
            <button type="submit">Add Tractor expense</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTractorForm;
