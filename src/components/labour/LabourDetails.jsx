import React from "react";

const LabourDetails = ({ labourValues }) => {
  return (
    <div>
      {labourValues.length > 0 ? (
        <div className="fields-container">
          {labourValues.map((labourDetails, index) => (
            <div key={index} className="field-box">
              {/* <div className="btn-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div> */}
              <p>Work Name: {labourDetails.workName}</p>
              <p>Fields Name: {labourDetails.fieldsName}</p>
              <p>Total Cost: {labourDetails.cost}</p>
              <p>People: {labourDetails.numberOfPeople}</p>
              <p>Date: {labourDetails.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-fields">
          <p>No fields added yet. Please add some fields</p>
        </div>
      )}
    </div>
  );
};

export default LabourDetails;
