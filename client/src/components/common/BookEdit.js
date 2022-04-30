import { useEffect, useState, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Menubar } from "../../store/Store";

function BookEdit() {
  const { id } = useParams();
  const location = useLocation();
  const vpath = location.pathname.split("/")[1];
  const [visible] = useContext(Menubar);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const key = Cookies.get("auth");
  console.log("rendering count");

  useEffect(() => {
    showData();
  }, []);

  const showData = () => {
    axios
      .put(
        `/api/book`,
        { bookId: id },
        { headers: { auth: key } }
      )
      .then((result) => {
        setData(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("bookId", id);
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("category", data.category);
    formData.append("pre", data.image);
    formData.append("year", data.year);
    formData.append("copy", data.copy);
    formData.append("image", data.setImage);
    formData.append("about", data.about);

    await axios
      .put(`/api/librarian/books`, formData, {
        headers: { auth: key, enctype: "multipart/form-data" },
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.error) {
          toast.error(result.data.error, { position: "bottom-left" });
        } else if (result.data.warn) {
          toast.warning(result.data.warn, { position: "bottom-left" });
        } else if (result.data.message) {
          toast.success(result.data.message, { position: "bottom-left" });
          showData();
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
  };

  const imageUploadHandler =(e)=>{
    const objectURL = URL.createObjectURL(e.target.files[0])
    setData({ ...data, setImage: e.target.files[0], preview : objectURL })         
  }
  const routes = "Book Edit";
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
            Book Information
          </div>

          <section className="text-gray-600 body-font  m-0 p-0 relative"></section>
          <div className=" flex justify-center items-center w-auto h-auto mt-6 ">
            <label
              htmlFor="image"
              className=""
            >
              <img
                className="md:rounded-full md:w-96 md:h-96 object-cover ring-4 shadow-lg hover:opacity-80 cursor-pointer"
                src={data.preview ? data.preview : `../../image/${data.image}`}
                alt="img"
              />
            </label>
            <input
              onChange={imageUploadHandler}
              name="image"
              type="file"
              id="image"
              className="hidden"
            />
          </div>
          <div className="container mx-auto">
            <div className="flex flex-col text-center w-full mb-1"></div>

            <div className=" md:mt-0 md:col-span-2">
              <form onSubmit={handleUpdate} method="get">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-8 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {/* title components */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <input
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                          type="text"
                          name="title"
                          placeholder="Enter title"
                          value={data.title}
                          id="title"
                          required
                          className="mt-1 outline-none p-1  border-b  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {/* author components */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="block text-sm font-medium text-gray-700"
                        >
                          author
                        </label>
                        <input
                          onChange={(e) =>
                            setData({ ...data, author: e.target.value })
                          }
                          type="text"
                          name="author"
                          value={data.author}
                          placeholder="Enter author name"
                          id="author"
                          required
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {/* book ID components*/}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="book-id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Book ID
                        </label>
                        <input
                          type="number"
                          name="book-id"
                          value={data.bookId}
                          placeholder="Enter Book ID"
                          id="book-id"
                          disabled
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {/* copy components */}
                      <div className="col-span-6 sm:col-span-3">
                      <label
                          htmlFor="copy"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Book copies
                        </label>
                        <input
                          onChange={(e) =>
                            setData({ ...data, copy : e.target.value })
                          }
                          type="number"
                          name="copy"
                          value={data.copy}
                          placeholder="Enter book quantity"
                          id="copy"
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {/* year component here  */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="year"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Year
                        </label>
                        <input
                          onChange={(e) =>
                            setData({ ...data, year: e.target.value })
                          }
                          type="number"
                          name="year"
                          value={data.year}
                          placeholder="Enter year"
                          id="year"
                          required
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      {/* profileImage components */}
                      {/* <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          profile image
                        </label>
                        <input
                          onChange={(e)=> setData({...data, proImage : e.target.files[0]})}
                          name = 'profileImage'
                          type="file"
                          id="image"
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div> */}
                      {/* Category  components */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Category "
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category 
                        </label>
                        <input
                        type='text'
                          onChange={(e) =>
                            setData({ ...data, category : e.target.value })
                          }
                          value={data.category }
                          className="mt-1 border-b focus:ring-indigo-500 outline-none p-1 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-5">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          About
                        </label>
                        <textarea
                          onChange={(e) =>
                            setData({ ...data, about: e.target.value })
                          }
                          rows= '4'
                          type="text"
                          name="about"
                          value={data.about}
                          placeholder="Summary of this book"
                          id="about"
                          className="mt-1 border-b focus:ring-indigo-500  outline-none p-1  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    {/* submit button components */}
                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                      <Link
                        to={`/${vpath}/bookview/${id}`}
                        className="mr-4 inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ring-gray-500   text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                      >
                        Cancel
                      </Link>
                      {submitting ? (
                        <button
                          type="submit"
                          className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-gray-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                          disabled
                        >
                          Updating...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex justify-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm text-white font-medium rounded-md  ring-indigo-500  bg-indigo-600 hover:bg-indigo-700 text-whitefocus:outline-none focus:ring-2  focus:ring-indigo-500"
                        >
                          Update
                        </button>
                      )}
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
export default BookEdit;
