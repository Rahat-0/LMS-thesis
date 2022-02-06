import { useEffect, useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar, SchoolID } from "../../store/Store";

function StudentView() {
  const [visible] = useContext(Menubar);
  const [sclId] = useContext(SchoolID);

  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [paths, setPath] = useState("");
  const key = Cookies.get("auth");

  useEffect(() => {
    axios
      .post(
        "/api/admin/students/view",
        { schoolId: sclId },
        { headers: { auth: key } }
      )
      .then((result) => {
        console.log(result);
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log("student view error here" + err));
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
      <div
        className={` text-center flex justify-center items-center opacity-90 `}
      >
        <div className="  fixed bg-gray-700 text-white top-1/3 rounded-2xl">
          <div className="  w-96 h-56 flex justify-center items-center">
            <div className="">
              <p className="mt-20 px-2">
                do you want to delete this account permanently!
              </p>
              <div className="flex justify-between mt-12">
                <input
                  className="text-black p-2 px-9 rounded-xl bg-gray-400 border focus:ring-2 focus:ring-gray-500 cursor-pointer"
                  type="button"
                  value="cancel"
                />
                <input
                  className="p-2 px-9 rounded-xl bg-red-400 border focus:ring-2 focus:ring-red-500 cursor-pointer"
                  type="button"
                  value="delete"
                />
              </div>
            </div>
          </div>
        </div>
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
            <div className="  space-x-4 flex flex-col md:flex-row md:justify-start justify-center space-y-3 ">
              <div>
                <div className=" w-full text-center h-full md:w-52 md:h-52">
                  <img
                    className="bg-red-400  w-auto h-auto md:h-52 "
                    src={`../image/${data.profileImage}`}
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
                    <tr className="text-gray-600">
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
                type="button"
                value="delete"
                className="bg-red-300 p-2 rounded-md w-32 focus:border-red-400 border-4 cursor-pointer"
              />
              <input
                type="button"
                value="deactivate"
                className="bg-yellow-300 p-2 rounded-md w-32 focus:border-yellow-400 border-4 cursor-pointer"
              />
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default StudentView;
