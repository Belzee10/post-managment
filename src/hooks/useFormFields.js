import { useReducer } from "react";

const handleFormFieldsReducer = (state, action) => {};

const useFormFields = initialFormFields => {
  const [state, dispatch] = useReducer(handleFormFieldsReducer, {
    formFields: initialFormFields
  });
};

export default useFormFields;
