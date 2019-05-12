import React, { useState, useEffect } from "react";
import { useDataApi, useForm } from "./hooks";

import URL_API from "./env";
import { postFormFields } from "./utils";

import Title from "./components/Title";
import Table from "./components/Table";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Form from "./components/Form";

const App = () => {
  const {
    data,
    isLoading,
    isError,
    doGet,
    doPost,
    doPut,
    doDelete
  } = useDataApi([]);

  const { formVisible, formFields, itemBeenEdited, setForm } = useForm(
    postFormFields
  );

  useEffect(() => {
    doGet(`${URL_API}/posts`);
  }, []);

  const handleCreatePost = body => {
    doPost(`${URL_API}/posts`, body);
  };

  const handleEditPost = body => {
    doPut(`${URL_API}/posts/${itemBeenEdited.id}`, body);
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
                    {formVisible === "CREATE" ? (
                      <Form
                        title="Create a prost"
                        fields={formFields}
                        onSubmit={handleCreatePost}
                        // onCancel={handleShowCreatePost}
                      />
                    ) : (
                      <Button
                        onClick={() => setForm("CREATE")}
                        className="mb-3"
                        type="primary"
                        size="sm"
                      >
                        Create
                      </Button>
                    )}
                    {formVisible === "EDIT" && (
                      <Form
                        // title={`Edit '${itemEditable.title}' post`}
                        fields={formFields}
                        onSubmit={handleEditPost}
                        // onCancel={handleShowEditPost}
                      />
                    )}
                    {data.length ? (
                      <Table
                        data={data}
                        onEditItem={item => setForm("EDIT", item)}
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
