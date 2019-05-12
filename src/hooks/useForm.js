import { useReducer } from "react";

const handleFormReducer = (state, action) => {
  switch (action.type) {
    case "EMPTY":
      return {
        ...state,
        formVisible: "",
        itemBeenEdited: null
      };
    case "CREATE":
      return {
        ...state,
        formVisible: action.type,
        itemBeenEdited: null
      };
    case "EDIT":
      const newFormFields = state.formFields.map(element => {
        return {
          ...element,
          value: action.payload[element.name]
        };
      });
      return {
        ...state,
        formVisible: action.type,
        formFields: newFormFields,
        itemBeenEdited: action.payload
      };
    default:
      return { ...state };
  }
};

const useForm = initialFormFields => {
  const [state, dispatch] = useReducer(handleFormReducer, {
    formVisible: "",
    formFields: initialFormFields,
    itemBeenEdited: null
  });

  const setForm = (formType, item) => {
    dispatch({ type: formType, payload: item });
  };

  return { ...state, setForm };
};

export default useForm;
