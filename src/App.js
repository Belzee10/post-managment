import React, { useState, useEffect } from "react";
import { useDataApi, useFormFields } from "./hooks";

import URL_API from "./env";
import { postFormFields } from "./utils";

import Title from "./components/Title";
import Table from "./components/Table";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";

const App = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [itemEditable, setItemEditable] = useState(null);

  const { data, isLoading, isError, doGet, doPost, doDelete } = useDataApi([]);

  const { formFields, setFormFields } = useFormFields(postFormFields);

  // console.log(formFields);

  useEffect(() => {
    doGet(`${URL_API}/posts`);
  }, []);

  useEffect(() => {
    // console.log("there");
    if (itemEditable) setFormFields(itemEditable);
  }, [itemEditable]);

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
