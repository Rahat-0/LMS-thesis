import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Menubar } from "../../store/Store";

function StudentAdd() {
  const location = useLocation()
  const vpath = location.pathname.split('/')[1]
  
  const [visible] = useContext(Menubar);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [gender, setGender] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  const handleInsert = async (e) => {
    e.preventDefault();

    if (pass !== conPass) {
      toast.error("password does not match!", { position: "bottom-left" });
      setError(true);
      return;
    }
    setLoading(true);
    const formdata = {
      schoolId,
      name,
      email,
      gender,
      password : pass
    };
    axios
      .post("/api/signup", formdata)
      .then((result) => {
        if (result.data.vError) {
          toast.error(result.data.vError, {position  : "bottom-left"});
        } else if (result.status === 201) {
          toast.success("student create success!", {position : "bottom-left"});
          
        } else {
          console.log(result);
        }
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });

  };

  const routes = "Student Add";

  return (
    <div
      className={`flex flex-col pt-20 p-5 ${
        visible ? " ml-80 lg:w-9/12" : ""
      } `}
    >
      <div className={`${loading ? "block" : "hidden"} text-center`}>
        {" "}
        loading...{" "}
      </div>

      <div className=" w-full h-28 flex justify-between items-center bg-blue-50 rounded-t-md">
        <div>
          <div className="p-2 text-3xl">{routes}</div>
          <div className="px-2 pb-2">Dashboard / {routes}</div>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="w-full h-14 pt-2 text-center  bg-green-50  shadow overflow-hidden sm:rounded-md font-bold text-3xl text-gray-500 ">
            Insert Student Information
          </div>

          <section className="text-gray-600 body-font  m-0 p-0 relative"></section>

          <div className="container    mx-auto">
            <div className="flex flex-col text-center w-full mb-1"></div>

            <div className="mt-10 md:mt-0 md:col-span-2">
              <form onSubmit={handleInsert}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-8 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                      
                          placeholder="Enter your name"
                          value={name}
                          id="name"
                          required
                          className="mt-1 outline-none p-1  border-b  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          value={email}
                          placeholder="Enter your email"
                          id="email"
                          required
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="school-id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          School ID
                        </label>
                        <input
                          onChange={(e) => setSchoolId(e.target.value)}
                          type="number"
                          value={schoolId}
                          placeholder="Enter school ID"
                          id="school-id"
                          required
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="student"
                          className="block text-sm font-medium text-gray-700"
                        >
                          User Type
                        </label>
                        <input
                          type="text"
                          value="student"
                          placeholder="Student"
                          id="student"
                          disabled
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          profile image
                        </label>
                        <input
                          type="file"
                          
                          id="image"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <input
                          onChange={(e) => setGender(e.target.value)}
                          type="text"
                          
                          value={gender}
                          placeholder="Enter gender (male or female)"
                          id="gender"
                          required
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          onChange={(e) => setPass(e.target.value)}
                          type="password"
                          name="password"
                          value={pass}
                          placeholder="Enter Password"
                          id="password"
                          required
                          className={`${
                            error ? "bg-red-200 " : ""
                          } mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="conPassword"
                          className={` ${
                            error ? "text-red-900" : ""
                          }block text-sm font-medium text-gray-700`}
                        >
                          Confirm Password
                        </label>
                        <input
                          onChange={(e) => setConPass(e.target.value)}
                          type="password"
                          name="conPassword"
                          value={conPass}
                          placeholder="Enter Confirm Password"
                          id="conPassword"
                          required
                          className={`${
                            error ? "bg-red-200 " : ""
                          } mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                      <Link
                        to={`/${vpath}/dashboard`}
                        className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500   text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-indigo-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className=""></div>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentAdd;
