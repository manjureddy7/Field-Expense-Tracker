import React, { useState, useContext } from "react";

const AddLabourForm = (props) => {
  const { handleSubmitLabourData, totalFieldNames } = props;

  const initialLabourFormValues = {
    workName: "",
    fieldsName: "",
    numberOfPeople: "",
    cost: "",
    date: "",
  };

  const [labourData, setLabourData] = useState(initialLabourFormValues);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLabourData({
      ...labourData,
      [name]: value.toUpperCase(),
    });
  };
  const handleSubmitLabourDataFom = (e) => {
    e.preventDefault();
    const finalLabourData = {
      ...labourData,
      uid: new Date().getTime().toString(),
    };
    handleSubmitLabourData(finalLabourData);
    setLabourData({
      ...labourData,
      workName: "",
      cost: 0,
      numberOfPeople: 0,
      date: "",
      fieldsName: "",
    });
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmitLabourDataFom}>
        <div>
          <label>Work Name: </label>
          <input
            type="text"
            name="workName"
            value={labourData.workName}
            placeholder="Type of labour work"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cost: </label>
          <input
            type="number"
            name="cost"
            value={labourData.cost}
            placeholder="Labour Cost"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Number of People:</label>
          <input
            type="number"
            name="numberOfPeople"
            value={labourData.numberOfPeople}
            placeholder="Number of people"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Select Field: </label>
          <select name="fieldsName" onChange={handleInputChange}>
            {totalFieldNames.length > 0 &&
              totalFieldNames.map((field, index) => (
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
            value={labourData.date}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ width: "105%", marginTop: "10px" }}>
          <button type="submit">Add Labour expense</button>
        </div>
      </form>
    </div>
  );
};

export default AddLabourForm;
