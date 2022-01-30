import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar, SchoolID } from "../../store/Store";

function StudentView() {
  const [visible] = useContext(Menubar);
  const [sclId] = useContext(SchoolID);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .post(
        "/api/admin/students/view",
        { schoolId: sclId },
        { headers: { auth: key } }
      )
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
            <span className="text-2xl block py-2">About Me</span>
            <div className="flex space-x-4">
              <div>
                <img className="bg-red-400 w-52 h-52" src="" alt="profile" />
              </div>
              <table className="text-left text-lg">
                <tr className="">
                  <th>Full Name :</th> <td className="m px-3">{data.name}</td>
                </tr>
                <tr className="">
                  <th>School ID :</th>{" "}
                  <td className="m px-3">{data.schoolId}</td>
                </tr>
                <tr className="">
                  <th>Mobile :</th> <td className="m px-3">012313421231</td>
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

            <div>
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
                    <tr>
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
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default StudentView;
