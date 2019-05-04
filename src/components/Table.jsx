import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import Alert from "./Alert";

/**
 * @description render all Object values in a <td> tag
 * @param {Object} obj
 */
const renderValues = obj =>
  Object.keys(obj).map((key, index) => <td key={index}>{obj[key]}</td>);

/**
 * @description render all Object's keys in a <th> tag
 * @param {Object} obj
 */
const renderKeys = obj =>
  Object.keys(obj).map((key, index) => <th key={index}>{key}</th>);

const Table = props => {
  const { type, data, onDeleteItem } = props;
  return data.length ? (
    <table className={`table table-${type}`}>
      <thead>
        <tr>
          <th scope="col">#</th>
          {renderKeys(data[0])}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index}</td>
            {renderValues(item)}
            <td>
              <Button className="mr-1" type="warning" size="sm" outline>
                Edit
              </Button>
              <Button
                onClick={() => onDeleteItem(item.id)}
                type="danger"
                size="sm"
                outline
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <Alert type="secondary">No Posts to show :(</Alert>
  );
};

Table.propTypes = {
  type: PropTypes.oneOf([
    "",
    "dark",
    "striped",
    "bordered",
    "borderless",
    "hover",
    "sm"
  ]),
  data: PropTypes.arrayOf(PropTypes.object)
};

Table.defaultProps = {
  type: "",
  data: []
};

export default Table;
