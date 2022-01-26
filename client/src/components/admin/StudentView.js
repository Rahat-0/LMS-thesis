import { useEffect, useState, useContext } from "react";
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar, Stuidentity } from "../../store/Store";

function StudentView() {
  const [visible] = useContext(Menubar);
  const [StuID] = useContext(Stuidentity);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [gender, setGender] = useState("");
  const [userType, setUserType] = useState("");

  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .post("/api/admin/students", { StuID }, { headers: { auth: key } })
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setSchoolId(result.data.schoolId);
        setGender(result.data.gender);
        setUserType(result.data.userType);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "/api/admin/students",
        { name, email, schoolId, gender },
        { headers: { auth: key } }
      )
      .then((result) => {
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
      })
      .catch((err) => {
        console.log("custom error here" + err);
        setError(err);
      });
  };


  const routes = "Student View";

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
            Student View
          
            <ToastContainer />
         
        </div>
      </div>
    </div>
  );
}
export default StudentView;
