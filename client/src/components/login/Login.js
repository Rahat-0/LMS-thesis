import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {isLogins} from '../../store/Store'
import logo from "../../assets/The_logo_of_Nanjing_University_of_Information_Science_and_Technology.png";
import { LockClosedIcon } from "@heroicons/react/solid";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // context api calling
  const [ , setIsValid ] = useContext(isLogins)


  


  const loginHandler = (e) => {
    e.preventDefault();

    const data = {
      schoolId: id,
      password,
    };

    axios
      .post("/api/login", data)
      .then((result) => {
        if (result.data.error) {
            toast.error(result.data.error, {position : "top-center"})
        } else if (result.data.token) {
          Cookies.set("auth", result.data.token);
          setIsValid(true)
          navigate("/");
        } else {
          console.log(result);
          setIsValid(false)
        }
      })
      .catch((err) => {
        console.log(err);
        setIsValid(false)
      });
  };

  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-blue-100">
        <div className="max-w-md w-full space-y-8">
          <div className="">
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={loginHandler}
            className="mt-8 space-y-6 "
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px p-5 ">
              <div className="pb-4 ">
                <label htmlFor="school-id" className="sr-only">
                  School ID
                </label>
                <input
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  id="school-id"
                  name="schoolId"
                  type="number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="School ID"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="##"
                  className="font-medium text-indigo-600 hover:text-indigo-400"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
               
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
