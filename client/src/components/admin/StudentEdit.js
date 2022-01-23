import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar, Update } from "../../store/Store";

function StudentEdit() {
  const [visible] = useContext(Menubar);
  const [update] = useContext(Update)


  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const key = Cookies.get("auth");


  useEffect(()=>{
    console.log(update)
    axios.post("/api/admin/students", {update}, { headers: { auth: key}} )
    .then((result)=>{
      console.log(result)
    })
    .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    axios
      .put("/api/admin/students", { headers: { auth: key}  })
      .then((result) => {
        if (result.data.error) {
        } else {
          setData(result.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("custom error here" + err);
        setError(err);
      });
  }, []);

  const routes = "Student Edit";

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
            Student Information
          </div>

          <section className="text-gray-600 body-font  m-0 p-0 relative"></section>

          <div className="container    mx-auto">
            <div className="flex flex-col text-center w-full mb-1"></div>

            <div className="mt-10 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-8 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          placeholder="Enter your name"
                          id="first-name"
                          required
                          autocomplete="given-name"
                          className="mt-1 outline-none p-1  border-b  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter your email"
                          id="email"
                          required
                          autocomplete="email"
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="school-id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          School ID
                        </label>
                        <input
                          type="text"
                          name="school-id"
                          placeholder="Enter school ID"
                          id="school-id"
                          required
                          autocomplete="family-name"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="student"
                          className="block text-sm font-medium text-gray-700"
                        >
                          User Type
                        </label>
                        <input
                          type="text"
                          name="student"
                          placeholder="Student"
                          id="student"
                          disabled
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="school-id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          profile image
                        </label>
                        <input
                          type="file"
                          name="school-id"
                          id="school-id"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="countr"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Gender
                        </label>
                        <input
                          type="text"
                          name="school-id"
                          placeholder="Enter gender"
                          id="school-id"
                          required
                          autocomplete="family-name"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>


                     
                    </div>

                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                      <button
                        type="submit"
                        className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500   text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-indigo-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Update
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentEdit;
