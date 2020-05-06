import React, { useState, useContext } from "react";
import { TractorContext } from "../../context/tractorContext";

const EditTractorForm = (props) => {
  const {
    handleSubmitTractorData,
    finalFieldNames,
    editedTractorDetails,
  } = props;

  const [tractorData, setTractorData] = useState(editedTractorDetails);
  const { dispatchToTractor, ...rest } = useContext(TractorContext);

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
    dispatchToTractor({
      type: "HIDE_EDIT_FORM",
    });
  };
  return (
    <div>
      {tractorData && (
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
                  onClick={() => {
                    dispatchToTractor({
                      type: "HIDE_EDIT_FORM",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div>Hello</div>
    </div>
  );
};

export default EditTractorForm;
