import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  checkIsAuth,
  getUserName,
  logout,
} from "../redux/features/auth/authSlice";

export const NavBar = () => {
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector(getUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out");
    navigate("/");
  };

  const aciveStyles = {
    color: "white",
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span
        className="flex justify-center items-center w-10 h-6 bg-gray-600
       text-xs text-white rounded-sm"
      >
        Blog
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              href="/"
              className="text-xs text-gray-400 hover:text-white ease-out duration-300"
              style={({ isActive }) => (isActive ? aciveStyles : undefined)}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              href="/"
              className="text-xs text-gray-400 hover:text-white ease-out duration-300"
              style={({ isActive }) => (isActive ? aciveStyles : undefined)}
            >
              My posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              href="/"
              className="text-xs text-gray-400 hover:text-white ease-out duration-300"
              style={({ isActive }) => (isActive ? aciveStyles : undefined)}
            >
              Add post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex items-center justify-center text-xs text-white ">
        <div className="flex items-center justify-center">
          {isAuth ? (
            <>
              <span>Welcome,&nbsp;</span>
              <p className="underline mr-2">{user.username}!</p>
              <button
                className="flex justify-center items-center bg-gray-600 text-xs  text-white rounded-sm px-4 py-2 hover:bg-gray-800 ease-out duration-300"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="flex justify-center items-center bg-gray-600 text-xs  text-white rounded-sm px-4 py-2 hover:bg-gray-800 ease-out duration-300"
              to={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
