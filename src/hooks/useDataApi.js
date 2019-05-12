import { useReducer } from "react";

const handleDataReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "REQUEST_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return { ...state };
  }
};

const useDataApi = initialData => {
  const [state, dispatch] = useReducer(handleDataReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });

  const doGet = url => {
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        dispatch({ type: "REQUEST_SUCCESS", payload: res });
      })
      .catch(err => {
        dispatch({ type: "REQUEST_FAILURE" });
        console.log(`Error fetching data: ${err}`);
      });
  };

  const doPost = (url, body) => {
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(newItem => {
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: [newItem, ...state.data]
        });
      })
      .catch(err => {
        dispatch({ type: "REQUEST_FAILURE" });
        console.log(`Error posting data: ${err}`);
      });
  };

  const doPut = (url, body) => {
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "PUT",
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(editedItem => {
        const data = [...state.data];
        const index = data.findIndex(elem => elem.id === editedItem.id);
        data.splice(index, 1, editedItem);
        dispatch({ type: "REQUEST_SUCCESS", payload: data });
      })
      .catch(err => {
        dispatch({ type: "REQUEST_FAILURE" });
        console.log(`Error puting data: ${err}`);
      });
  };

  const doDelete = (url, itemId) => {
    fetch(url, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(() => {
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: [...state.data.filter(item => item.id !== itemId)]
        });
      })
      .catch(err => {
        dispatch({ type: "REQUEST_FAILURE" });
        console.log(`Error deleting data: ${err}`);
      });
  };

  return { ...state, doGet, doPost, doPut, doDelete };
};

export default useDataApi;
