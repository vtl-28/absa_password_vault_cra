import React from "react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  Outlet,
  Link,
  NavLink,
} from "react-router-dom";
import useUserStore from '../store/UserStore';


function Vault() {
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();
  function handleLogout() {
    axios.post("/logout");
    navigate("/");
  }
  let activeStyle = {
    color: "red",
  };

  return (
    <div className="w-screen h-screen" style={{ overflowY: "hidden" }}>
        <div className="py-4" style={{ backgroundColor: "#F0325A" }}>
      <div className="container flex flex-row justify-between px-12 mx-auto">
        <h1 className="text-2xl text-white">Welcome, { user ? user.name : "anonymous"}</h1>
        <div className="mt-1">
          <Link to={`/account/${user._id}`} className="font-normal text-white">
            My account
          </Link>
          <button onClick={handleLogout} className="ml-6 font-normal text-white">
            Log out
          </button>
        </div>
      </div>
    </div>
      <div className="container w-9/12 h-full mx-auto mt-6">
        <div className="grid h-full grid-cols-10 grid-rows-4 gap-10">
          <div className="flex flex-col col-span-3 row-span-3 bg-white border border-opacity-100 rounded border-gray">
            <div className="flex items-center justify-center h-12 bg-gray-100 bg-opacity-50 border-b-2 border-gray-300">
              <h1 className="font-semibold uppercase ">Filters</h1>
            </div>
            <input
              className="pl-1 mt-6 text-xs border-2 border-black h-7 border-opacity-10 sm:text-center md:mx-2 md:text-base"
              placeholder="Search Vault"
            />
            <div className="flex flex-col items-center mt-10 ">
              <h1 className="mb-3 font-semibold">Types</h1>
              <nav className="flex flex-col">
                <NavLink
                  to="d_absa"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  D_Absa
                </NavLink>
                <NavLink
                  to="sessions"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Sessions
                </NavLink>
                <NavLink
                  to="sap"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Sap
                </NavLink>
                <NavLink
                  to="client"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Client
                </NavLink>
              </nav>
            </div>
          </div>
          <div className="col-span-7 row-span-3 bg-white">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold sm:text-2xl">My Vault</h1>
            </div>
            <hr className="mt-1" />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Vault;
