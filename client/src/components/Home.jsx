import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/ABSA_Group_Limited_Logo.png";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import api from "../api";
import useUserStore from '../store/UserStore';
import axios from "axios";


const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    master_password: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [showError, setShowError] = useState(false);

  const login_details = [{ "email": "malaika@gmail.com", "password": "123456" },
    { "email": "charyl@gmail.com", "password": "123456" },
    { "email": "susan@gmail.com", "password": "123456" },
    { "email": "hope@gmail.com", "password": "123456" },
    { "email": "vuyisile@gmail.com", "password": "123456" },
    { "email": "vtlehola@gmail.com", "password": "123456" },
    { "email": "botho@yahoo.com", "password": "123456" }];
  
    const get_login_details = (e) => {
      e.preventDefault();
      const random_details = Math.floor(Math.random() * login_details.length);
      const random = login_details[random_details];
      setData({
        email: random.email,
        master_password: random.password,
      });
    };
  

  let errorAlert = (
    <Alert className="px-3 py-1 bg-red-100 border-2 border-red-500 border-opacity-25 rounded-md">
      <div className="flex flex-row justify-between">
        <p className="text-sm text-red-500">{errorMessage}</p>
        <Button className="text-red-500" onClick={() => setShowError(false)}>
          x
        </Button>
      </div>
    </Alert>
  );

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.email || !data.master_password) {
      setErrorMessage("Please enter all the fields");
      setShowError((showError) => !showError);
      return;
    }

    axios.post("https://absa-password-vault-server.vercel.app/user/login", data).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("jwt", JSON.stringify(response.data.token));
        
        setUser(response.data);
        navigate("/vault");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowError((showError) => !showError);
      });
  }

  return (
    <div className="col-span-3 col-start-2 mb-4 border -mt-52 h-60 sm:col-start-3 sm:col-span-6 md:col-start-4 xl:col-start-5 xl:col-span-4">
      <div className="p-4 bg-white border rounded-md border-gray">
        {errorMessage && showError ? errorAlert : ""}
        <form onSubmit={handleSubmit}>
          <label className="label-style">Email Address</label>
          <input
            className="input-style"
            name="email"
            onChange={handleChange}
            value={data.email}
            data-testid="email"
          />
          <label className="label-style">Master password</label>
          <input
            className="input-style"
            name="master_password"
            type="password"
            onChange={handleChange}
            value={data.master_password}
            data-testid="master_password"
          />
          <button className="text-sm text-red-600 hover:underline">
            <Link to="/password_hint">Get master password hint</Link>
          </button>
          <hr className="mt-8" />
          <div className="flex xs:flex-col justify-between mt-4">
            <button className="w-24 text-sm btn-submit sm:w-36 sm:text-base lg:w-48 xl:w-40">
              Log in
            </button>
            <button className="text-sm btn-cancel sm:w-36 sm:text-base lg:w-48 xl:w-40">
              <Link onClick={get_login_details}>Login details</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Home() {
  return (
    <div
      className="w-screen h-screen pt-16"
      style={{ backgroundColor: "#F0325A" }}
    >
      <div className="container w-full h-full px-12 mx-auto">
        <div className="grid h-full grid-cols-5 grid-rows-3 sm:grid-cols-10 md:grid-cols-12">
          <div className="flex items-start h-16 col-span-3 col-start-2 sm:col-start-3 sm:col-span-6 md:col-start-4 md:justify-center justify-evenly">
            <img src={logo1} alt="Web application logo" />
            <p className="font-sans text-2xl text-white sm:text-3xl md:text-4xl md:ml-4">
              <span className="font-bold">Password</span> vault
            </p>
          </div>
          <div className="flex h-16 col-span-3 col-start-2 -mt-28 sm:col-start-3 sm:col-span-6 md:col-start-4 xl:col-start-5 xl:col-span-4">
            <p className="text-base text-center text-white sm:text-lg md:text-xl">
              Log in or create a new account to access your secure vault
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
