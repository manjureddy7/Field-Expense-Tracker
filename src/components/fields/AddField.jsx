import React, { useContext, useState } from "react";
import { FieldsContext } from "../../context/FieldContext";
import AddFieldForm from "./AddFieldForm";

// Initial State
const initialFieldValues = {
  fieldName: "",
  acres: 0,
};

const AddField = () => {
  
  const [fieldData, setFieldData] = useState(initialFieldValues);
  const { fieldsData: { hideEditForm }, addFieldDataToDB } = useContext(FieldsContext);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFieldData({
      ...fieldData,
      [name]: value.toUpperCase(),
    });
  };

  // Submit data to Firestore
  const addField = async (e) => {
    e.preventDefault();
    const finalFieldData = {
      ...fieldData,
      uid: new Date().getTime().toString(),
    };
    await addFieldDataToDB(finalFieldData);
    setFieldData({
      ...fieldData,
      fieldName: "",
      acres: "",
    });
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
    </div>
  );
};

export default AddField;
