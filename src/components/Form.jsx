import React, { useState } from "react";

import Title from "./Title";
import Button from "./Button";

/**
 * @description Capitalize an String
 * @param {String} str
 */
const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1, str.lentgh);

/**
 * @description Render form fields based on an array of objects
 * @param {Array} fields
 */
const renderFields = (fields, fieldValue, onChangeField) => {
  return fields.map((field, index) => {
    const Type = field.type;
    return (
      <div key={field.name} className="form-group">
        <label htmlFor={`${field.name}-${index}`}>
          {capitalize(field.name)}
        </label>
        <Type
          value={fieldValue}
          onChange={onChangeField}
          type="text"
          className="form-control form-control-sm"
          id={`${field.name}-${index}`}
          placeholder={field.placeholder}
        />
      </div>
    );
  });
};

const Form = props => {
  const [fieldValue, setFieldValue] = useState("");

  const handleOnFieldChange = e => {
    setFieldValue(e.target.value);
    console.log("changing...", e.target.value);
  };

  const { title, fields } = props;
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="form">
          <Title type="h5">{title}</Title>
          <form>
            {fields.length &&
              renderFields(fields, fieldValue, handleOnFieldChange)}
            <Button size="sm">Save</Button>
            <Button type="secondary" size="sm">
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
