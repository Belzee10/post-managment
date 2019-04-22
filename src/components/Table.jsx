import React from "react";

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
  const { type, data } = props;
  return (
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
          <tr key={index}>
            <td>{index}</td>
            {renderValues(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
