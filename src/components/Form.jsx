import React, { useState, useEffect } from "react";
import { capitalize } from "../utils";

import Title from "./Title";
import Button from "./Button";

/**
 * @description Render form fields based on an array of objects
 * @param {Array} fields
 * @param {String} fieldValue
 * @param {Function} onChangeField
 */
const renderFields = (fields, onChangeField) => {
  return fields.map((field, index) => {
    const { name, type, placeholder, value } = field;
    const Type = type;
    return (
      <div key={name} className="form-group">
        <label htmlFor={`${name}-${index}`}>{capitalize(name)}</label>
        <Type
          value={value}
          onChange={e => onChangeField(e, index)}
          type="text"
          className="form-control form-control-sm"
          id={`${name}-${index}`}
          placeholder={placeholder}
        />
      </div>
    );
  });
};

const Form = props => {
  const { title, fields, onCancel, onSubmit } = props;

  const [fieldValues, setFieldValues] = useState(fields);

  useEffect(() => {
    return clearFieldValues();
  }, []);

  const handleOnFieldChange = (e, index) => {
    const newFieldValues = [...fieldValues];
    newFieldValues[index].value = e.target.value;
    setFieldValues(newFieldValues);
  };

  const handleOnCancel = e => {
    e.preventDefault();
    onCancel();
  };

  const clearFieldValues = () => {
    const newFieldValues = fieldValues.map(field => {
      field.value = "";
      return field;
    });
    setFieldValues(newFieldValues);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="form bg-light border p-2 mb-2">
          <Title type="h5">{title}</Title>
          <form>
            {fields.length && renderFields(fields, handleOnFieldChange)}
            <Button className="mr-1" size="sm">
              Save
            </Button>
            <Button onClick={handleOnCancel} type="secondary" size="sm">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
