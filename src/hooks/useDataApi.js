import { useState, useEffect } from "react";

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
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
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };
  return { data, isLoading, isError, doFetch };
};

export default useDataApi;
