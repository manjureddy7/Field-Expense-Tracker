import React, { useState, useContext } from "react";
import { TractorContext } from '../../context/TractorContext';

const initialTractorValues = {
  tractorAction: "",
  rounds: 0,
  oneRoundCost: 0,
  fieldsName: "",
  date: "",
};

const AddTractorForm = ({ finalFieldNames }) => {

  const [tractorData, setTractorData] = useState(initialTractorValues);
  const { addTractorDetailsToDB } = useContext(TractorContext);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setTractorData({
      ...tractorData,
      [name]: value.toUpperCase(),
    });
  };

  // Call context method to add data to Firestore
  const handleSubmitTractorDataFom = async (e) => {
    e.preventDefault();
    const finalTractorData = {
      ...tractorData,
      uid: new Date().getTime().toString(),
      totalCost: Number(tractorData.rounds) * Number(tractorData.oneRoundCost),
    };
    await addTractorDetailsToDB(finalTractorData);
    setTractorData({
      ...tractorData,
      tractorAction: "",
      rounds: 0,
      oneRoundCost: 0,
      date: "",
    });
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmitTractorDataFom}>
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
        <div style={{ width: "105%", marginTop: "10px" }}>
          <button type="submit">Add Tractor expense</button>
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
