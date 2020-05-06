import React, { useState, useContext } from "react";
import { FieldsContext } from "../../context/fieldsContext";

const AddLabourForm = (props) => {
  const { handleSubmitLabourData } = props;
  const { fieldsData } = useContext(FieldsContext);
  const { fieldValues } = fieldsData;
  const totalFieldNames = fieldValues.map((fieldValue) => fieldValue.fieldName);
  const finalFieldNames = ["", ...totalFieldNames];

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
    <div>
      <form onSubmit={handleSubmitLabourDataFom}>
        <div className="tractor-form">
          <div className="tractor-form-action">
            <label>Work Name: </label>
            <input
              type="text"
              name="workName"
              value={labourData.workName}
              placeholder="Type of labour work"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-rounds">
            <label>Cost: </label>
            <input
              type="number"
              name="cost"
              value={labourData.cost}
              placeholder="Labour Cost"
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-expense">
            <label>Number of People:</label>
            <input
              type="number"
              name="numberOfPeople"
              value={labourData.numberOfPeople}
              placeholder="Number of people"
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
              value={labourData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="tractor-form-button">
            <button type="submit">Add Labour expense</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLabourForm;
