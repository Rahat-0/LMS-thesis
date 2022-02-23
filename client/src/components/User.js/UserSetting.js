import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ComPopUpConfirm from "../common/ComPopUpConfirm";

function UserSetting() {
  const [data, setData] = useState([]);

  const [isSetting, setIsSetting] = useState(false);
  const [deletes, setDelete] = useState(false);
  const [deactivate, setDeactivate] = useState(false);

  const navigate = useNavigate();
  const key = cookies.get("auth");
  const auth = key.split(" ")[1];
  const { schoolId } = jwt(auth);

  useEffect(() => {
    if (key) {
      axios
        .get(`api/student/${schoolId}`, { headers: { auth: key } })
        .then((result) => {
          console.log(result.data);
          setData(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const deactiveHandler = () => {
    axios
      .put("api/student/status", { schoolId }, { headers: { auth: key } })
      .then((result) => {
        if (result.data.message === "success") {
          navigate("/");
          cookies.set("auth", "");
        } else {
          console.log(result.data);
          toast.error("deactivation failed!");
        }
      })
      .catch((err) => console.log(err));
  };
  const deleteHandler = () => {
    alert("deleted");
  };

  const editHandler = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div>
      <div className="bg-red-400 h-16">sr only</div>

      {/* popup confirmation component */}
      <ComPopUpConfirm
        deleted={deleteHandler}
        deactived={deactiveHandler}
        states={[deletes, setDelete, deactivate, setDeactivate]}
      />

      <div className="bg-white md:flex md:justify-around">
        <div className="hidden md:block md:w-3/12">
          <h3 className="font-bold text-4xl py-3">Settings</h3>
          <ul>
            <li
              className={`${
                isSetting ? "" : "bg-red-300 text-white"
              } p-2 bg-gray-100 my-2 rounded-lg hover:bg-red-400 cursor-pointer`}
              onClick={() => setIsSetting(false)}
            >
              {" "}
              Public profile
            </li>
            <li
              className={`${
                isSetting ? "bg-red-300 text-white" : ""
              } p-2 bg-gray-100 my-2 rounded-lg hover:bg-red-400 cursor-pointer`}
              onClick={() => setIsSetting(true)}
            >
              Account settings
            </li>
          </ul>
        </div>
        {isSetting ? (
          <div className="md:w-8/12">
            <h3 className="text-center md:text-left text-3xl p-2 bg-gray-200 md:bg-white">
              Profile Setting
            </h3>
            <div className="flex flex-col justify-between  md:items-start m-2 space-y-3 border p-2 rounded shadow-lg">
              <div className="flex justify-between w-full p-2 border rounded bg-red-50 shadow">
                <div className="px-1">
                  <h4 className="font-bold text-lg text-red-700">
                    deactivate this account
                  </h4>
                  <p className="text-sm">
                    will sign out and no longer signin untill activated from
                    librarians
                  </p>
                </div>
                <input
                  onClick={() => setDeactivate(true)}
                  className=" rounded px-2  bg-yellow-700 text-white font-bold hover:bg-white hover:text-black cursor-pointer border-2 border-yellow-500"
                  type="button"
                  value="deactivate"
                />
              </div>

              <div className="flex justify-between w-full p-2 border rounded bg-red-50 shadow">
                <div className="px-1">
                  <h4 className="font-bold text-lg text-red-700">
                    delete this account
                  </h4>
                  <p className="text-sm">will delete everything permanenly. </p>
                </div>
                <input
                  onClick={() => setDelete(true)}
                  className=" rounded px-2 bg-red-900 text-white font-bold hover:bg-white hover:text-black cursor-pointer border-2 border-red-700"
                  type="button"
                  value="delete"
                />
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={editHandler} className="md:w-8/12">
            <h3 className="text-center md:text-left text-3xl p-2 bg-gray-200 md:bg-white">
              Public profile
            </h3>
            <div className="flex flex-col md:flex-row md:w-9/12  justify-center items-center">
              <div className="flex justify-center w-56 h-56 m-2">
                <img
                  className=" shadow-2xl bg-cover md:w-60 object-contain text-center border-8 rounded-full"
                  src={`../image/${data.profileImage}`}
                  alt="profile pictures"
                />
              </div>
              <div className="text-white">
                <button className=" md:w-52 block md:ml-10 md:my-6 bg-green-500 w-80 my-2 rounded-lg py-2 hover:bg-green-800">
                  Change picture
                </button>
                <button
                  type="submit"
                  className=" md:w-52 block md:ml-10 md:my-6 bg-red-500 w-80 my-2 rounded-lg py-2 hover:bg-red-800"
                >
                  Edit profile
                </button>
              </div>
            </div>
            <div className="flex flex-col  justify-center md:items-start items-center">
              <div className="flex flex-col md:m-2 md:flex-row md:w-9/12 md:space-x-5 justify-center items-center ">
                <div className="md:w-6/12">
                  <label className="font-bold">full name</label>
                  <input
                    className="block w-80 md:w-full rounded-lg px-2 py-2 bg-green-100 outline-none"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    value={data.name}
                    type="text"
                  />
                </div>
                <div className="md:w-6/12">
                  <label className="font-bold">schoolID</label>
                  <input
                    className="block w-80 md:w-full rounded-lg px-2 py-2 bg-green-100 outline-none"
                    disabled
                    value={data.schoolId}
                    type="number"
                  />
                </div>
              </div>
              <div className="md:w-full md:m-2">
                <label className="block font-bold">email</label>
                <input
                  className="w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  type="text"
                />
              </div>

              <div className="md:w-full md:m-2">
                <label className="block font-bold">user type</label>
                <input
                  className="w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none "
                  disabled
                  value={data.userType}
                  type="text"
                />
              </div>

              <div className="md:w-full md:m-2">
                <label className="block font-bold">mobile</label>
                <input
                  className="w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none"
                  value="098094832"
                  type="number"
                />
              </div>

              <div className="md:w-full md:m-2">
                <label className="block font-bold">gender</label>
                <select
                  className="w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none"
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  value={data.gender}
                >
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>

              <div className="md:w-full md:m-2">
                <label className="block font-bold">Bio</label>
                <textarea
                  className="w-80 md:w-9/12 rounded-lg px-2 py-2 bg-green-100 outline-none"
                  onChange={(e) => setData({ ...data, bio: e.target.value })}
                  value={data.bio}
                  type="textarea"
                />
              </div>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserSetting;
