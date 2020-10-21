import React, { useState, useContext } from "react";
import { TractorContext } from "../../context/TractorContext";

const EditTractorForm = (props) => {
  const {
    handleSubmitTractorData,
    finalFieldNames,
    editedTractorDetails,
  } = props;

  const [tractorData, setTractorData] = useState(editedTractorDetails);
  const { dispatchToTractor } = useContext(TractorContext);

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
        <div className="auth-form">
          <h2 className="text-center">Edit Tractor details</h2>
          <form onSubmit={handleEditTractorData}>
            <div>
              <label>Action Type: </label>
              <input
                type="text"
                name="tractorAction"
                value={tractorData.tractorAction}
                placeholder="Type of tractor action"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Rounds: </label>
              <input
                type="number"
                name="rounds"
                value={tractorData.rounds}
                placeholder="Rounds of tractor"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Each Round Expense: </label>
              <input
                type="number"
                name="oneRoundCost"
                value={tractorData.oneRoundCost}
                placeholder="Each round expense"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Select Field: </label>
              <select name="fieldsName" onChange={handleInputChange}>
                {finalFieldNames.length > 0 &&
                  finalFieldNames.map((field, index) => (
                    <option value={field} key={index}>
                      {field}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                placeholder="date"
                name="date"
                value={tractorData.date}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button type="submit">Update</button>
              <button
                onClick={() => {
                  dispatchToTractor({
                    type: "HIDE_EDIT_FORM",
                  });
                }}
                style={{ color: "white", backgroundColor: "red" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditTractorForm;
