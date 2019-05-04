// import { useState, useEffect } from "react";

// const useDataApi = (initialUrl, initialMethod, initialData) => {
//   const [url, setUrl] = useState(initialUrl);
//   const [method, setMethod] = useState(initialMethod);
//   const [body, setBody] = useState({});
//   const [id, setId] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [data, setData] = useState(initialData);

//   useEffect(() => {
//     setIsError(false);
//     setIsLoading(true);
//     switch (method) {
//       case "GET":
//         fetch(url)
//           .then(resp => resp.json())
//           .then(res => {
//             setData(res);
//             setIsLoading(false);
//           })
//           .catch(err => {
//             setIsLoading(false);
//             setIsError(true);
//             console.log(`Error fetching data: ${err}`);
//           });
//         break;

//       case "POST":
//         fetch(url, {
//           headers: new Headers({
//             "Content-Type": "application/json"
//           }),
//           method: method,
//           body: JSON.stringify(body)
//         })
//           .then(resp => resp.json())
//           .then(res => {
//             setData([res, ...data]);
//             setIsLoading(false);
//           })
//           .catch(err => {
//             setIsLoading(false);
//             setIsError(true);
//             console.log(`Error posting data: ${err}`);
//           });
//         break;

//       case "DELETE":
//         fetch(url, {
//           method: method
//         })
//           .then(resp => resp.json())
//           .then(() => {
//             const newData = data.filter(item => item.id !== id);
//             setData(newData);
//             setIsLoading(false);
//           })
//           .catch(err => {
//             setIsLoading(false);
//             setIsError(true);
//             console.log(`Error deleting data: ${err}`);
//           });
//         break;

//       default:
//         break;
//     }
//   }, [url, method, body, id]);

//   const doFetch = (url, method, body, id) => {
//     setUrl(url);
//     setMethod(method);
//     setBody(body);
//     setId(id);
//   };
//   return { data, isLoading, isError, doFetch };
// };

// export default useDataApi;

import { useReducer } from "react";

const handleDataReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
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
      break;
  }
};

const useDataApi = initialData => {
  const [state, dispatch] = useReducer(handleDataReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  const doGet = url => {
    dispatch({ type: "REQUEST_INIT" });
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
    dispatch({ type: "REQUEST_INIT" });
    fetch(url, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(res => {
        dispatch({ type: "REQUEST_SUCCESS", payload: [res, ...state.data] });
      })
      .catch(err => {
        dispatch({ type: "REQUEST_FAILURE" });
        console.log(`Error fetching data: ${err}`);
      });
  };

  const doDelete = (url, itemId) => {
    dispatch({ type: "REQUEST_INIT" });
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
        console.log(`Error fetching data: ${err}`);
      });
  };

  return { ...state, doGet, doPost, doDelete };
};

export default useDataApi;
