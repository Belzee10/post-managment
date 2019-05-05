import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";

/**
 * @description render the table body
 * @param {Object} obj
 * @param {Array} exclude
 */
const renderValues = (obj, exclude) =>
  Object.keys(obj).map((key, index) =>
    !exclude.includes(key) ? <td key={index}>{obj[key]}</td> : null
  );

/**
 * @description render the table header
 * @param {Object} obj
 * @param {Array} exclude
 */
const renderKeys = (obj, exclude) =>
  Object.keys(obj).map((key, index) =>
    !exclude.includes(key) ? <th key={index}>{key}</th> : null
  );

const Table = props => {
  const { type, data, onDeleteItem, excludeFields } = props;

  return (
    <table className={`table table-${type}`}>
      <thead>
        <tr>
          <th scope="col">#</th>
          {renderKeys(data[0], excludeFields)}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td style={{ fontWeight: "bold" }}>{index + 1}</td>
            {renderValues(item, excludeFields)}
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
  data: PropTypes.arrayOf(PropTypes.object),
  excludeFields: PropTypes.arrayOf(PropTypes.string)
};

Table.defaultProps = {
  type: "",
  data: [],
  excludeFields: ["id"]
};

export default Table;
