import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Menubar } from "../../store/Store";
import Cookies from "js-cookie";

function BookAdd() {
  const location = useLocation()
  const vpath = location.pathname.split('/')[1]
  
  const [visible] = useContext(Menubar);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState("");
  const key = Cookies.get("auth");

  const handleBookInsert = async (e) => {
    e.preventDefault();
    console.log(data)
    setLoading(true);
    const formdata = new FormData();
    formdata.append('title', data.title)
    formdata.append('author', data.author)
    formdata.append('year', data.year)
    formdata.append('copy', data.copy)
    formdata.append('category', data.category)
    formdata.append('image', data.image)
    formdata.append('about', data.about)
    axios
      .post("/api/librarian/books", formdata, {
        headers: { auth: key, enctype: "multipart/form-data" },
      })
      .then((result) => {
        console.log(result)
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
            Insert Book Information
          </div>

          <section className="text-gray-600 body-font  m-0 p-0 relative"></section>

          <div className="container    mx-auto">
            <div className="flex flex-col text-center w-full mb-1"></div>

            <div className="mt-10 md:mt-0 md:col-span-2">
              <form onSubmit={handleBookInsert}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-8 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          onChange={(e) => setData({...data, title : e.target.value})}
                          type="text"
                      
                          placeholder="Enter book title"
                          value={data.title}
                          id="title"
                          required
                          className="mt-1 outline-none p-1  border-b  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          onChange={(e) => setData({...data, author : e.target.value})}
                          type="text"
                          value={data.author}
                          placeholder="Enter author name"
                          id="author"
                          required
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Year
                        </label>
                        <input
                          onChange={(e) => setData({...data, year : e.target.value})}
                          type="number"
                          value={data.year}
                          placeholder="Enter year"
                          id="year"
                          required
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          type="text"
                          onChange={(e)=> setData({...data, category : e.target.value})}
                          value={data.category}
                          placeholder="category"
                          id="category"
                          required
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option>history</option>
                            <option>chemastry</option>
                            <option>biology</option>
                            <option>philosophy</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                         Book image
                        </label>
                        <input
                          type="file"
                        onChange={(e)=> setData({...data, image : e.target.files[0]}) }
                          id="image"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="copy"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Copy
                        </label>
                        <input
                          onChange={(e) => setData({...data, copy : e.target.value})}
                          type="number"
                          
                          value={data.copy}
                          placeholder="Enter book quantity"
                          id="copy"
                          required
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          about
                        </label>
                        <input
                          onChange={(e) => setData({...data, about : e.target.value})}
                          type="about"
                          name="about"
                          value={data.about}
                          placeholder="Enter book about"
                          id="about"
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
export default BookAdd;
