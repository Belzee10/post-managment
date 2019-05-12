/**
 * @description Capitalize an String
 * @param {String} str
 */
export const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1, str.lentgh);

export const postFormFields = [
  {
    name: "title",
    type: "input",
    placeholder: "Enter title",
    value: ""
  }
  // {
  //   name: "author",
  //   type: "input",
  //   placeholder: "Enter author",
  //   value: ""
  // }
];
