import React, { useContext } from "react";
import { FieldsContext } from "../../context/FieldContext";
import { TractorContext } from "../../context/TractorContext";
import TractorExpensesDetails from "./TractorExpensesDetails";
import AddTractorForm from "./AddTractorForm";

const AddTractorExpense = () => {
  
  const { fieldsData } = useContext(FieldsContext);
  const { tractorContextData } = useContext(TractorContext);
  const { showEditForm } = tractorContextData;
  const filedValuesWithName = Object.keys(fieldsData).length > 0 ? fieldsData.fieldValues.map(
    (fieldValue) => fieldValue.fieldName
  ) : []
  const finalFieldNames = [...new Set(["", ...filedValuesWithName])];

  return (
    <div>
      {!showEditForm && (
        <div>
          <AddTractorForm
            finalFieldNames={finalFieldNames}
          />
        </div>
      )}
      <div>
        <TractorExpensesDetails finalFieldNames={finalFieldNames} />
      </div>
    </div>
  );
};

export default AddTractorExpense;
