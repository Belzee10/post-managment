import { useState, useEffect } from "react";

const useDataApi = (initialUrl, initialMethod, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [method, setMethod] = useState(initialMethod);
  const [body, setBody] = useState({});
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    switch (method) {
      case "GET":
        fetch(url)
          .then(resp => resp.json())
          .then(res => {
            setData(res);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            setIsError(true);
            console.log(`Error fetching data: ${err}`);
          });
        break;

      case "POST":
        console.log("fired");

        fetch(url, {
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          method: method,
          body: JSON.stringify(body)
        })
          .then(resp => resp.json())
          .then(res => {
            setData([res, ...data]);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            setIsError(true);
            console.log(`Error posting data: ${err}`);
          });
        break;

      case "DELETE":
        fetch(url, {
          method: method
        })
          .then(resp => resp.json())
          .then(() => {
            const newData = data.filter(item => item.id !== id);
            setData(newData);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            setIsError(true);
            console.log(`Error deleting data: ${err}`);
          });
        break;

      default:
        break;
    }
  }, [url, method]);

  const doFetch = (url, method, body, id) => {
    setUrl(url);
    setMethod(method);
    setBody(body);
    setId(id);
  };
  return { data, isLoading, isError, doFetch };
};

export default useDataApi;
