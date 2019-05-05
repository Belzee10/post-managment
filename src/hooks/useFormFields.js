import { useReducer } from "react";

const handleFormFieldsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return {
        ...state,
        formFields: action.payload
      };
    default:
      return { ...state };
  }
};

const useFormFields = initialFormFields => {
  const [state, dispatch] = useReducer(handleFormFieldsReducer, {
    formFields: initialFormFields
  });

  const setFormFields = item => {
    const result = state.formFields.map(element => {
      return {
        ...element,
        value: item[element.name]
      };
    });
    dispatch({
      type: "UPDATE_FIELDS",
      payload: result
    });
  };

  return { ...state, setFormFields };
};

export default useFormFields;
