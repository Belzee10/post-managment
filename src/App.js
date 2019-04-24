import React, { useState, useEffect } from "react";

import URL_API from "./env";

import Title from "./components/Title";
import Table from "./components/Table";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetch(`${URL_API}/posts`)
      .then(resp => resp.json())
      .then(res => {
        setPosts(res);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Title type="h2">
              Post Managment{" "}
              <span role="img" aria-label="document">
                📃
              </span>
            </Title>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                {isLoading || !posts.length ? (
                  <span>loading...</span>
                ) : (
                  <Table data={posts} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
