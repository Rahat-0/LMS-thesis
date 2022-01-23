import React from "react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import logo from "../../assets/The_logo_of_Nanjing_University_of_Information_Science_and_Technology.png";
import { LockClosedIcon } from "@heroicons/react/solid";

function Signup() {
  const [id, setId] = React.useState("");
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [gender , setgender] = React.useState("select")
  const [password, setpassword] = React.useState("");
  const [conpassword, setconpassword] = React.useState("");

  // useNavigate use for redirect to login page 
  const Navigate = useNavigate()

  const submitHandler = (e) => {
    console.log(id);
    e.preventDefault();
    const formdata = {
      schoolId: id,
      name,
      email,
      gender,
      password
    };

  

    axios
      .post("/api/signup", formdata)
      .then((result) => {
        if (result.data.vError) {
          toast.error(result.data.vError, {position  : "top-center"});
        } else if (result.status === 201) {
          toast.success("submition successfull, you'll redirect to login page", {transition : "top-center"});
          setTimeout(() => {
            Navigate("/login")
          }, 5000);
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  return (
    <>
      <div className="bg-blue-100 min-h-screen">
        <div className="">
          <img className="mx-auto pt-4 h-16 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Sign Up account
          </h2>
        </div>
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          method="post"
        >
          {/* school id field */}
          <div className="flex justify-center mt-4  ">
            <div className="flex justify-between bg-blue-100 rounded-md">
              <label
                htmlFor="school-id"
                className=" w-60 lg:w-32 items-center flex "
              >
                School ID
              </label>
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                value={id}
                id="school-id"
                name="schoolId"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="School ID"
              />
            </div>
          </div>

          {/* name field */}
          <div className="flex justify-center mt-4  ">
            <div className="flex justify-between bg-blue-100 rounded-md">
              <label
                htmlFor="fullname"
                className=" w-60 lg:w-32 items-center flex "
              >
                Full Name
              </label>
              <input
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                id="fullname"
                name="fullname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* email field */}
          <div className="flex justify-center mt-4  ">
            <div className="flex justify-between bg-blue-100 rounded-md">
              <label
                htmlFor="email"
                className=" w-60 lg:w-32 items-center flex "
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email}
                id="email"
                name="email"

                type="email"
                required
                className="appearance-none rounded-none relative block w-full  px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
              />
            </div>
          </div>


          {/* gender field */}
          <div className="flex justify-center mt-4  ">
            <div className=" flex bg-blue-100 rounded-md">
              <label
                htmlFor="gender"
                className=" w-44 lg:w-24 items-center flex "
              >
               gender
              </label>
             
              <select
                onChange={(e) => {
                  setgender(e.target.value);
                }}
                value={gender}
                id="gender"
                name="gender"
                required
                className="appearance-none w-72 rounded-none relative block lg:w-60 px-3 py-2 border bg-gray-100 border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                
              >
                <option value="select" selected>select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                
                
                 </select>
              
              
            </div>
          </div>

          {/* password field */}
          <div className="flex justify-center mt-4  ">
            <div className="flex justify-between bg-blue-100 rounded-md">
              <label
                htmlFor="password"
                className=" w-60 lg:w-32 items-center flex "
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                value={password}
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* confirm password field */}
          <div className="flex justify-center mt-4  ">
            <div className="flex justify-between bg-blue-100 rounded-md">
              <label
                htmlFor="conpassword"
                className=" w-60 lg:w-32 items-center flex "
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => {
                  setconpassword(e.target.value);
                }}
                value={conpassword}
                id="conpassword"
                name="conpassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* submit field */}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" relative sm:w-80 lg:w-80 md:w w-full m-5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign Up
            </button>
          </div>
        </form>
          <ToastContainer />
      </div>
    </>
  );
}

export default Signup;
