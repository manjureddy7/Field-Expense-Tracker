import React, { useContext, useState } from "react";
import FirebaseContext from "../context/firebaseContext";
import Fields from "./Fields";
import { FieldsContext } from "../context/fieldsContext";

const AddField = () => {
  const firebaseContext = useContext(FirebaseContext);
  const initialFieldValues = {
    fieldName: "",
    acres: 0,
  };
  const [fieldData, setFieldData] = useState(initialFieldValues);

  const { fieldsData, dispatchToField, loading, error } = useContext(
    FieldsContext
  );

  // onChange of Field data
  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFieldData({
      ...fieldData,
      [name]: value.toUpperCase(),
    });
  };

  // Submit data to Firestore
  const addField = (e) => {
    e.preventDefault();

    // Initialise Firestore
    const db = firebaseContext.firestore();

    // We can add data into firestore by two ways

    // Type: 1
    // db.collection("PaddyFields")
    //   .add({
    //     fieldName: fieldName,
    //     acres: acres,
    //   })

    //  Type: 2
    // Sample how to craete in other way
    // db.collection("cities")
    //   .doc("LA")
    //   .set({
    //     name: "LA",
    //     state: "SA",
    //     country: "USA",
    //   })
    //   .then(() => {
    //     console.log("successfully written");
    //   })
    //   .catch((error) => console.log("error happend", error));

    // Type: 4
    // If you want firestore to set doc id automatically
    // db.collection("TestWithoutDocId")
    //   .add(data)
    //   .then((response) =>
    //     console.log("Data is successfully submitted", response)
    //   )
    //   .catch((error) => console.log("Unable to add field", error));

    // Type: 5
    const finalFieldData = {
      ...fieldData,
      uid: new Date().getTime(),
    };

    db.collection("paddyFields")
      .doc(finalFieldData.uid.toString())
      .set(finalFieldData)
      .then((data) => {
        setFieldData({
          ...fieldData,
          fieldName: "",
          acres: "",
        });
        dispatchToField({
          type: "ADD_FIELD",
          payload: finalFieldData,
        });
      })
      .catch((error) => console.log("Unable to add field", error));
  };

  return (
    <div>
      <form onSubmit={addField}>
        <div className="field-form">
          <div className="field-form-name">
            <label>Field Name:</label>
            <input
              type="text"
              name="fieldName"
              placeholder="Field name"
              value={fieldData.fieldName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-form-acres">
            <label>Acres:</label>
            <input
              type="number"
              name="acres"
              placeholder="Acres"
              value={fieldData.acres}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Field</button>
        </div>
      </form>
      <hr />
      <Fields />
    </div>
  );
};

export default AddField;
