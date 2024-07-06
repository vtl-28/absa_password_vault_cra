import React, { useState } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function ApplicationPasswordCard({ pass, handleDelete }) {
  const { _id, application_name, username, password } = pass;

  const copyUsernameToClipboard = () => {
    copy(username);
    alert(`Copied!`);
  };
  const copyPasswordToClipboard = () => {
    axios
      .get(`/decrypt_password/${password}`)
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
export default function Client() {
  const location = useLocation();
  const [applicationPassword, setApplicationPassword] = useState({
    department: "Client",
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


  function handleChange(e) {
    setApplicationPassword((applicationPassword) => ({
      ...applicationPassword,
      [e.target.name]: e.target.value,
    }));
  }
  function handleDelete(e) {
   
      axios.delete(`/delete_password/${e.target.name}`);
      setApp(app.filter((app) => app._id !== e.target.name));

    setOpenAddItem((openAddItem) => !openAddItem);
    setOpenList((openList) => !openList);

  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/create_password", applicationPassword)
      .then((response) => {
        setApplicationPassword({
          department: "Client",
          application_name: "",
          username: "",
          application_password: "",
        });
        setApp([...app, response.data]);
        setOpenList((openList) => !openList);
        setOpenAddItem((openAddItem) => !openAddItem);
        setSuccessMessage("Application password successfully created");
        setShowSuccess((showSuccess) => !showSuccess);
      })
      .catch((error) => {});
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
      {app.map((pass) => (
        <ApplicationPasswordCard pass={pass} handleDelete={handleDelete} />
      ))}
    </ul>
  );
  const addApplication = (
    <div>
      <h3 className="mb-2">There are no items to list</h3>
      <button type="button" className="btn-add-item" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Add item
      </button>
    </div>
  );

  return (
    
    <div className="flex flex-col mt-2">
      {successMessage && showSuccess ? successAlert : ""}
      {openAddItem ? addApplication : ""}
      {openList ? displayApplication : ""}
      <div className="fixed border border-gray rounded-md hidden h-full overflow-x-hidden overflow-y-auto outline-none modal fade" id="exampleModalCenter" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
         <div className="relative w-auto pointer-events-none modal-dialog modal-dialog-centered">
            <div className="relative flex flex-col w-auto text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
              <div className="flex items-center justify-between flex-shrink-0 px-3 pt-4 border-b border-gray-200 modal-header rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                  Add item
                </h5>
                <button type="button"
                  className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal" aria-label="Close">X</button>
              </div>
              <div className="relative px-12 py-4 modal-body">
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
        <option value="Client">Client</option>
         <option value="D_Absa">D_Absa</option>
          <option value="Sessions">Sessions</option>
          <option value="Sap">Sap</option>
    </select>
      <div className="mt-4 mb-4 form-group">
        <label className="inline-block font-semibold text-gray-700 form-label">Application name</label>
        <input type="text" name="application_name" onChange={handleChange}
            value={applicationPassword.application_name} className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
          aria-describedby="emailHelp" />
      </div>
      <div className="mb-4 form-group">
        <label  className="inline-block font-semibold text-gray-700 form-label">Username</label>
        <input type="text" name="username" onChange={handleChange}
            value={applicationPassword.username}  className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
          aria-describedby="emailHelp"/>
      
      </div>
      <div className="mb-6 form-group">
        <label className="inline-block font-semibold text-gray-700 form-label">Password</label>
        <input type="password" name="application_password" onChange={handleChange}
            value={applicationPassword.application_password}  className="block w-full px-0 py-0 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
        />
      </div>
          <div className="flex flex-row mt-10">
                  <button className="w-full btn-submit" type="submit" data-bs-dismiss="modal">
                    Save
                  </button>
                  
          </div>
        </form>
              </div>
            </div>
        </div>
      </div>
      
    </div>
  );
}
