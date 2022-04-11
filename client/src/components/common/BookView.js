import { useEffect, useState, useContext } from "react";
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";
import ComPopUpConfirm from "./ComPopUpConfirm";

function BookView() {
  const navigate = useNavigate()
  const location = useLocation()
  const vpath = location.pathname.split('/')[1]

  const {bookId} = useParams()
  const [visible] = useContext(Menubar);
  //state control
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [deletes, setDelete] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  // auth control
  const key = Cookies.get("auth");

  // book deletion controller
  const deleteHandler = ()=>{
    axios.delete(`/api/${vpath}/books`,{data : {bookId : data.bookId}, headers : {auth : key}}  )
   .then((result)=>{
     navigate(`/${vpath}/dashboard`)
   })
   .catch(err => console.log(err))
  }
//
  // data fetching once
  useEffect(() => {
    axios
      .get(
        `/api/${vpath}/books/${bookId}`,
        { headers: { auth: key } }
      )
      .then((result) => {
        console.log(result)
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log("student view error here" + err));
  }, []);
  // route determine
  const routes = "Book View";

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
            <span className="text-2xl block py-2">About {data.title} </span>
            <div className="  space-x-4 flex flex-col md:flex-row md:justify-start justify-center space-y-3 ">
              <div>
                <div className=" w-full text-center h-full md:w-52 md:h-52">
                  <img
                    className="bg-red-400  w-auto h-auto md:h-52 object-contain bg-cover "
                    src={`../../image/${data.image}`}
                    alt="book"
                  />
                </div>
              </div>
              <table className="text-left text-lg">
                <tr className="">
                  <th>Book Title :</th> <td className="m px-3">{data.title} </td>
                </tr>
                <tr className="">
                  <th>Book ID :</th>{" "}
                  <td className="m px-3">{data.bookId}</td>
                </tr>
                <tr className="">
                  <th>Author :</th> <td className="m px-3">{data.author}</td>
                </tr>
                <tr className="">
                  <th>Year :</th> <td className="m px-3">{data.year}</td>
                </tr>
                <tr className="">
                  <th>Category :</th> <td className="m px-3">{data.category}</td>
                </tr>
                <tr className="">
                  <th>Total Copy :</th> <td className="m px-3">{data.copy}</td>
                </tr>
                <tr className="">
                  <th>Issue Date :</th> <td className="m px-3">{data.date}</td>
                </tr>
              </table>
            </div>
            <p className="py-4">
              {data.about}
            </p>

            <div className="bg-gray-100">
              <p className="text-center font-bold text-xl uppercase pb-3">
                User Resurved
              </p>
              <table className="w-full">
                <tr className="border">
                  <th>School ID </th>
                  <th>Name </th>
                  <th> Email </th>
                </tr>
                {data.issueUser ? (
                  data.issueUser.map((result) => (
                    <tr key={result.schoolId} className="text-gray-600">
                      <td className="text-center border">{result.schoolId}</td>
                      <td className="text-center border">{result.name}</td>
                      <td className="text-center border">{result.email}</td>
                    </tr>
                  ))
                ) : (
                  <p className="text-center">nothing user yet</p>
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
                onClick={()=> navigate(`/${vpath}/bookedit/${bookId}`)}
                type="button"
                value="edit"
                className="bg-green-300 p-2 rounded-md w-32 focus:border-green-400 border-4 cursor-pointer"
              />
            </div>
          </div>

          <ComPopUpConfirm deleted={deleteHandler}  states={[deletes, setDelete, deactivate, setDeactivate, data]} />
        </div>
      </div>
    </div>
  );
}
export default BookView;
