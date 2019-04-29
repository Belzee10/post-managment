import React, { useState, useEffect } from "react";

import URL_API from "./env";

import Title from "./components/Title";
import Table from "./components/Table";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";

const createFormFields = [
  {
    name: "title",
    type: "input",
    placeholder: "Enter title",
    value: ""
  },
  {
    name: "author",
    type: "input",
    placeholder: "Enter author",
    value: ""
  }
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  //TODO try to make a custom Hook to handle API calls

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
        console.log(`Error fetching data: ${err}`);
      });
  }, []);

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const handleCreatePost = data => {
    fetch(`${URL_API}/posts`, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(res => {
        setPosts([res, ...posts]);
      })
      .catch(err => console.log(`Error posting data: ${err}`));
  };

  const handleOnDelete = id => {
    fetch(`${URL_API}/posts/${id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(res => {
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
      })
      .catch(err => console.log(`Error deleting data: ${err}`));
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
                ) : isLoading ? (
                  <span>loading...</span>
                ) : (
                  <>
                    {showCreatePost ? (
                      <Form
                        title="Create a prost"
                        fields={createFormFields}
                        onCancel={handleShowCreatePost}
                        onSubmit={handleCreatePost}
                      />
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
                    <Table data={posts} onDeleteItem={handleOnDelete} />
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
