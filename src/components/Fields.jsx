import React, { useContext } from "react";
import { FieldsContext } from "../context/fieldsContext";

const Fields = (props) => {
  const { fieldsData, dispatchToField, loading, error } = useContext(
    FieldsContext
  );
  const { fieldValues } = fieldsData;

  return (
    <div>
      {loading && <div style={{ textAlign: "center" }}>Loading Data....</div>}
      {error && (
        <div>
          <p style={{ textAlign: "center", color: "red" }}>
            Something bad happened...!!!
          </p>
        </div>
      )}

      {fieldValues.length > 0 ? (
        <div className="fields-container">
          {fieldValues.map((field) => (
            <div key={field.uid} className="field-box">
              <p>Field Name: {field.fieldName}</p>
              <p>Acres: {field.acres}</p>
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

export default Fields;
