import { useEffect, useState, useContext } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import ComPopUpConfirm from "../common/ComPopUpConfirm";

function StudentView() {
  const navigate = useNavigate()
  const {schoolId} = useParams()
  const [visible] = useContext(Menubar);

  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  // const [paths, setPath] = useState("");
  const [deletes, setDelete] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const key = Cookies.get("auth");


  const deleteHandler = ()=>{
    axios.delete(`/api/admin/students`,{data : {schoolId : data.schoolId}, headers : {auth : key}}  )
   .then((result)=>{
     navigate('/admin/dashboard')
   })
   .catch(err => console.log(err))
  }
  
  const activeHandler = ()=>{
    setDeactivate(false)
     axios.put(`/api/admin/students/status`,{schoolId : data.schoolId, userStatus : data.userStatus === 'active' ? "deactive" : "active" }, {headers : {auth : key} } )
    .then((result)=>{
      if(result.data.message){
        toast.success(result.data.message, {position : 'bottom-left'} )
      }else{
        toast.error(result.data.error, {position : 'bottom-left'} )
      }
   })
   .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .post(
        "/api/admin/students/view",
        {schoolId },
        { headers: { auth: key } }
      )
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log("student view error here" + err));
  }, [activeHandler]);
  
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
          <div>
            <span className="text-2xl block py-2">About {data.name} </span>
            <div className="  space-x-4 flex flex-col md:flex-row md:justify-start justify-center space-y-3 ">
              <div>
                <div className=" w-full text-center h-full md:w-52 md:h-52">
                  <img
                    className="bg-red-400  w-auto h-auto md:h-52 object-contain bg-cover "
                    src={`../../image/${data.profileImage}`}
                    alt="profile"
                  />
                </div>
              </div>
              <table className="text-left text-lg">
                <tr className="">
                  <th>Full Name :</th> <td className="m px-3">{data.name} </td>
                </tr>
                <tr className="">
                  <th>School ID :</th>{" "}
                  <td className="m px-3">{data.schoolId}</td>
                </tr>
                <tr className="">
                  <th>Status :</th> <td className="m px-3">{data.userStatus}</td>
                </tr>
                <tr className="">
                  <th>Email :</th> <td className="m px-3">{data.email}</td>
                </tr>
                <tr className="">
                  <th>Gender :</th> <td className="m px-3">{data.gender}</td>
                </tr>
              </table>
            </div>
            <p className="py-4">
              Hello I am Daisy Parks. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry, simply dummy text of the
              printing and typesetting industry.
            </p>

            <div className="bg-gray-100">
              <p className="text-center font-bold text-xl uppercase pb-3">
                Book Resurved
              </p>
              <table className="w-full">
                <tr className="border">
                  <th> ID </th>
                  <th>Title </th>
                  <th> Author </th>
                </tr>
                {data.book ? (
                  data.book.map((result) => (
                    <tr key={result.bookId} className="text-gray-600">
                      <td className="text-center border">{result.bookId}</td>
                      <td className="text-center border">{result.title}</td>
                      <td className="text-center border">{result.author}</td>
                    </tr>
                  ))
                ) : (
                  <p className="text-center">nothing book yet</p>
                )}
              </table>
            </div>
            <div className="flex justify-end my-5 space-x-8">
              <input
                onClick={()=> setDelete(true)}
                type="button"
                value="delete"
                className="bg-red-300 p-2 rounded-md w-32 focus:border-red-400 border-4 cursor-pointer"
              />

              <input
                onClick={()=> navigate('/admin/studentedit/'+schoolId)}
                type="button"
                value="edit"
                className="bg-green-300 p-2 rounded-md w-32 focus:border-green-400 border-4 cursor-pointer"
              />

              <input
                onClick={()=> setDeactivate(true)}
                type="button"
                value={`${data.userStatus === 'active' ? "deactive" : "active"}`}
                className="bg-yellow-300 p-2 rounded-md w-32 focus:border-yellow-400 border-4 cursor-pointer"
              />
            </div>
          </div>

          <ComPopUpConfirm deleted={deleteHandler} deactived={activeHandler} states={[deletes, setDelete, deactivate, setDeactivate, data]} />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default StudentView;
