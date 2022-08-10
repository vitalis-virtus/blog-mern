import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkIsAuth } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  const changePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, navigate, isAuth]);

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40 "
    >
      <h1 className="text-lg text-white text-center">Authorization</h1>

      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700
          hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
        />
      </label>

      <label className="text-xs text-gray-400 relative">
        Password:
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700
          hover:bg-gray-300 ease-out duration-300 focus:bg-gray-300"
        />
        {/* show/hide password button */}
        <button
          type="button"
          onClick={changePasswordVisibility}
          className="absolute bottom-0 right-2"
        >
          {!passwordVisible ? (
            <AiFillEye className="text-gray-700 hover:text-gray-900 w-4 h-4 ease-out duration-300" />
          ) : (
            <AiFillEyeInvisible className="text-gray-700 hover:text-gray-900 w-4 h-4 ease-out duration-300" />
          )}
        </button>
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 hover:bg-gray-700 ease-out duration-300"
        >
          Login
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white border rounded-sm border-transparent py-2 px-4 hover:border-white ease-out duration-300"
        >
          No account?
        </Link>
      </div>
    </form>
  );
};
