import React, { useContext, useState } from "react";
import FieldsDetails from "./FieldsDetails";
import { FieldsContext } from "../../context/fieldsContext";
import AddFieldForm from "./AddFieldForm";
import { PADDY_COLLECTION } from "../../constants/collections";
import { firestoreDB } from "../../firebase";
import { useFirebase } from "../../context/FirebaseContext";

// Initial State
const initialFieldValues = {
  fieldName: "",
  acres: 0,
};

const AddField = () => {
  const [fieldData, setFieldData] = useState(initialFieldValues);

  const {
    fieldsData: { hideEditForm },
    dispatchToField,
  } = useContext(FieldsContext);

  const { userUID } = useFirebase();

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
      uid: new Date().getTime().toString(),
    };

    firestoreDB
      .collection(PADDY_COLLECTION)
      .doc(userUID)
      .collection("fields")
      .add(finalFieldData)
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
      {hideEditForm && (
        <AddFieldForm
          addField={addField}
          handleInputChange={handleInputChange}
          fieldData={fieldData}
        />
      )}
      <hr />
      <FieldsDetails />
    </div>
  );
};

export default AddField;
