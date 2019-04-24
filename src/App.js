import React, { useState, useEffect } from "react";

import URL_API from "./env";

import Title from "./components/Title";
import Table from "./components/Table";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";

const formFields = [
  {
    name: "title",
    type: "input",
    placeholder: "Enter title"
  },
  {
    name: "author",
    type: "input",
    placeholder: "Enter author"
  }
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

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

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

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
                {isError ? (
                  <Alert>That was an error fetching your data :(</Alert>
                ) : isLoading || !posts.length ? (
                  <span>loading...</span>
                ) : (
                  <>
                    {showCreatePost ? (
                      <Form title="Create a prost" fields={formFields} />
                    ) : (
                      <Button
                        onClick={handleShowCreatePost}
                        className="mb-3"
                        type="primary"
                        size="sm"
                      >
                        Create
                      </Button>
                    )}
                    <Table data={posts} />
                  </>
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
