import React, { useState, useEffect } from "react";
import useDataApi from "./hooks";

import URL_API from "./env";

import Title from "./components/Title";
import Table from "./components/Table";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";

const fields = [
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
  },
  {
    name: "content",
    type: "textarea",
    placeholder: "Content here",
    value: ""
  }
];

const App = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [itemEditable, setItemEditable] = useState(null);
  const [formFields, setFormFields] = useState(fields);
  const { data, isLoading, isError, doGet, doPost, doDelete } = useDataApi([]);

  useEffect(() => {
    doGet(`${URL_API}/posts`);
  }, []);

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
    if (itemEditable) setItemEditable(null);
  };

  const handleShowEditPost = item => {
    setItemEditable(item);
    if (showCreatePost) setShowCreatePost(false);
  };

  const handleCreatePost = data => {
    doPost(`${URL_API}/posts`, data);
  };

  const handleOnDelete = id => {
    doDelete(`${URL_API}/posts/${id}`, id);
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
                {isError && (
                  <Alert>That was an error fetching your data :(</Alert>
                )}
                {isLoading ? (
                  <span>loading...</span>
                ) : (
                  <>
                    {showCreatePost ? (
                      <Form
                        title="Create a prost"
                        fields={formFields}
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
                    {itemEditable && (
                      <Form
                        title={`Edit '${itemEditable.title}' post`}
                        fields={formFields}
                        onCancel={handleShowEditPost}
                      />
                    )}
                    {data.length ? (
                      <Table
                        data={data}
                        onEditItem={handleShowEditPost}
                        onDeleteItem={handleOnDelete}
                      />
                    ) : (
                      <Alert type="secondary">No Posts to show :(</Alert>
                    )}
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
