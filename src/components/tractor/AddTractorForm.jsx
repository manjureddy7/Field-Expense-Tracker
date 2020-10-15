import React, { useState } from "react";

const AddTractorForm = (props) => {
  const { handleSubmitTractorData, finalFieldNames } = props;
  console.log("final field names", finalFieldNames)

  const initialTractorValues = {
    tractorAction: "",
    rounds: 0,
    oneRoundCost: 0,
    fieldsName: "",
    date: "",
  };

  const [tractorData, setTractorData] = useState(initialTractorValues);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setTractorData({
      ...tractorData,
      [name]: value.toUpperCase(),
    });
  };
  const handleSubmitTractorDataFom = (e) => {
    e.preventDefault();
    const finalTractorData = {
      ...tractorData,
      uid: new Date().getTime().toString(),
      // expenseDateFormat: `${day}-${month}-${year}`,
      totalCost: Number(tractorData.rounds) * Number(tractorData.oneRoundCost),
    };
    handleSubmitTractorData(finalTractorData);
    setTractorData({
      ...tractorData,
      tractorAction: "",
      rounds: 0,
      oneRoundCost: 0,
      date: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmitTractorDataFom}>
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
                finalFieldNames.map((field, index) => (
                  <option value={field} key={index}>
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
      <p className="total-expense">
        Total Expense for thid field is -
        <span style={{ color: "red" }}>
          {" "}
          {Number(tractorData.rounds) * Number(tractorData.oneRoundCost)}
        </span>
      </p>
    </div>
  );
};

export default AddTractorForm;
