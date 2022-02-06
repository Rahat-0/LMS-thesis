import { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar, SchoolID } from "../../store/Store";

function StudentEdit() {
  const [visible] = useContext(Menubar);
  const [sclId] = useContext(SchoolID);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [gender, setGender] = useState("");
  const [userType, setUserType] = useState("");
  const [preimg, setPreimg] = useState("");
  const [proImage, setProImage] = useState();
  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .post("/api/admin/students", { schoolId : sclId }, { headers: { auth: key } })
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setSchoolId(result.data.schoolId);
        setGender(result.data.gender);
        setUserType(result.data.userType);
        setPreimg(result.data.profileImage)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const preImage = () =>{
    console.log("preImage calling")
    axios
      .post("/api/admin/students", { schoolId : sclId }, { headers: { auth: key } })
      .then((result) => {
        setPreimg(result.data.profileImage)
      })
      .catch((err) => console.log(err));
  }
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    const formData = new FormData();
      formData.append('name',name)
      formData.append('email',email)
      formData.append('schoolId',schoolId)
      formData.append('gender',gender)
      formData.append('pre', preimg)
      formData.append('profileImage',proImage)
    await axios
      .put(
        "/api/admin/students",
        formData,
        { headers: { auth: key , enctype: "multipart/form-data"} }
      )
      .then((result) => {
        console.log(result.data)
        if (result.data.error) {
          toast.error(result.data.error, { position: "bottom-left" });
        } else if (result.data.warn) {
          toast.warning(result.data.warn, { position: "bottom-left" });
        } else if (result.data.message) {
          toast.success(result.data.message, { position: "bottom-left" });
        } else {
          toast.error("someting is wrong!", { position: "bottom-left" });
        }
        setLoading(false);
        setTimeout(() => {
        setSubmitting(false);
        }, 500);
      })
      .catch((err) => {
        console.log("custom error here" + err);
      });
      preImage()
  };


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
              <form onSubmit={handleUpdate} method="get">
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
                          name="name"
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
                          name="email"
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
                          type="number"
                          name="school-id"
                          value={schoolId}
                          placeholder="Enter school ID"
                          id="school-id"
                          disabled
                          
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
                          name="student"
                          value={userType}
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
                          onChange={(e)=> setProImage(e.target.files[0])}
                          name = 'profileImage'
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
                          placeholder="Enter gender"
                          id="gender"
                          required
                          
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div> 
                    </div>

                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                      <Link
                        to="/admin/dashboard"
                        className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500   text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Cancel
                      </Link>
                      {submitting ? 
                      <button
                      type="submit"
                      className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-gray-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                      disabled
                    >
                      Updating...
                    </button>
                    :
                        <button
                          type="submit"
                          className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-indigo-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                          
                        >
                          Update
                        </button>
                    
                    }
                        
                        
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
export default StudentEdit;
