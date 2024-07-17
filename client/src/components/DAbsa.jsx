import React, { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Alert from "react-bootstrap/Alert";
import api from "../api";
import useUserStore from '../store/UserStore';
import fetch_application from "../Utils/application";

function ApplicationPasswordCard({ pass, handleDelete }) {
  const { _id, application_name, username, password } = pass;

  const copyUsernameToClipboard = () => {
    copy(username);
    alert(`Copied!`);
  };
  const copyPasswordToClipboard = () => {
    api
      .get(`/decrypt_password/${_id}`)
      .then((response) => {
        copy(response.data);
      });
    alert(`Copied!`);
  };

  return (
    <li key={_id} className="mt-4">
      <a className="grid grid-cols-12 rounded-md hover:bg-gray-100 py-1.5" href="#">
        <div className="col-span-4 col-start-2">
          <h3>{application_name}</h3>
        </div>
        <div className="flex justify-between w-9/12 col-span-10 col-start-6">
          <button onClick={copyUsernameToClipboard} className="text-sm">
            Copy username
          </button>
          <button onClick={copyPasswordToClipboard} className="text-sm">
            Copy password
          </button>
          <button
            name={_id}
            onClick={handleDelete}
            className="text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </a>
    </li>
  );
}

function MyVerticallyCenteredModal(props) {
  const [applicationPassword, setApplicationPassword] = useState({
    department: "D_Absa",
    application_name: "",
    username: "",
    application_password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [app, setApp] = useState([]);
  const [openAddNewItem, setOpenAddNewItem ] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [show, setShow] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(true);

  
  function handleChange(e) {
    setApplicationPassword((applicationPassword) => ({
      ...applicationPassword,
      [e.target.name]: e.target.value,
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    api
      .post("/create_password", applicationPassword)
      .then((response) => {
        setApplicationPassword({
          department: "D_Absa",
          application_name: "",
          username: "",
          application_password: "",
        });
        setOpenList((openList) => !openList);
        setOpenAddItem((openAddItem) => !openAddItem);
        setSuccessMessage("Application password successfully created");
        setShowSuccess((showSuccess) => !showSuccess);
      })
      .catch((error) => {});
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-50w"
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          Add Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
              <select name="department" className="form-select
      appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
   aria-label="Disabled select example" disabled>
    <option value="D_Absa">D_Absa</option>
        <option value="Client">Client</option>
          <option value="Sessions">Sessions</option>
          <option value="Sap">Sap</option>
    </select>
      <div className="mt-4 mb-4 form-group">
        <label className="inline-block font-semibold text-gray-700 form-label">Application name</label>
        <input type="text" name="application_name" onChange={handleChange}
            value={applicationPassword.application_name} 
             className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
          aria-describedby="emailHelp" />
      </div>
      <div className="mb-4 form-group">
        <label  className="inline-block font-semibold text-gray-700 form-label">Username</label>
        <input type="text" name="username" onChange={handleChange}
            value={applicationPassword.username}
              className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
          aria-describedby="emailHelp"/>
      
      </div>
      <div className="mb-6 form-group">
        <label className="inline-block font-semibold text-gray-700 form-label">Password</label>
        <input type="password" name="application_password" onChange={handleChange}
            value={applicationPassword.application_password}
              className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
        />
      </div>
          <div className="flex flex-row mt-10">
                  <button className="w-full btn-submit" type="submit" data-bs-dismiss="modal">
                    Save
                  </button>
                  
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default function DAbsa() {
  const location = useLocation();
  const [applicationPassword, setApplicationPassword] = useState({
    department: "D_Absa",
    application_name: "",
    username: "",
    application_password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [app, setApp] = useState([]);
  const [openAddNewItem, setOpenAddNewItem ] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(true);
  const [id, setId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const user = useUserStore((state) => state.user);

  const user_id = user._id;

  const { data, error, status } = useQuery({
    queryKey: ['fetch_application', user_id], // Unique key
    queryFn: () => fetch_application(user_id), // Pass a function reference
    refetchOnMount: true,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  function handleDelete(e) {
      api.delete(`/delete_password/${e.target.name}`);
      setApp(app.filter((app) => app._id !== e.target.name));
  
    setOpenAddItem((openAddItem) => !openAddItem);
    setOpenList((openList) => !openList);

  }


  let successAlert = (
    <Alert className="px-3 py-1 bg-green-100 border-2 border-green-500 border-opacity-25 rounded-md">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-green-500">{successMessage}</p>
        <Button
          className="text-green-500"
          onClick={() => setShowSuccess(false)}
        >
          x
        </Button>
      </div>
    </Alert>
  );

  const displayApplication = (
    <ul>
      { data ? data.map((pass) => (
        <ApplicationPasswordCard pass={pass} handleDelete={handleDelete} />
      )) : ""}
    </ul>
  );
  const addApplication = (
    <div>
      <h3 className="mb-2">There are no items to list</h3>
      <button type="button" className="btn-add-item" onClick={() => setModalShow(true)}>
        Add item
      </button>
    </div>
  );

  return (
    
    <div className="flex flex-col mt-2">
      {successMessage && showSuccess ? successAlert : ""}
      { data?.length > 0 ? displayApplication : addApplication }
      {/* {openAddItem ? addApplication : ""}
      {openList ? displayApplication : ""} */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />      
    </div>
  );
}