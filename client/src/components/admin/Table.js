import React from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const [data, loading] = props.data;
  const [theader] = props.tableHeader;
  const { visible, error, routes } = props;

  const [search, setSearch] = React.useState("");

  const filterdData = data.filter((value) => {
    if (value.schoolId) {
      if (search === "") {
        return value;
      } else if (
        value.schoolId.toString().includes(search) ||
        value.name.toLowerCase().includes(search.toLowerCase()) ||
        value.email.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return value;
      }
    } else {
      if (search === "") {
        return value;
      } else if (
        value.bookId.toString().includes(search) ||
        value.title.toLowerCase().includes(search.toLowerCase()) ||
        value.year.toString().includes(search)
      ) {
        return value;
      }
    }
  });

  return (
    <div
      className={`flex flex-col pt-20 p-5 ${
        visible ? " ml-80 lg:w-9/12" : ""
      } `}
    >
      <div className=" w-full h-28 flex justify-between items-center bg-blue-50 rounded-t-md">
        <div>
          <div className="p-2 text-3xl">{routes}</div>
          <div className="px-2 pb-2">Dashboard / {routes}</div>
        </div>
        <div className="p-2">
          <input
            className="p-2 rounded-md outline-none"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search here"
          />
          <input
            className="p-2 bg-gray-300 rounded-r-md hover:bg-gray-500 hover:text-gray-200"
            type="submit"
            value="seach"
          />
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow  border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {theader.map((heads) => {
                    return (
                      <th
                        key={heads}
                        scope="col"
                        className="px-6 py-3 w-4/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {heads}
                      </th>
                    );
                  })}

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {error ? (
                  <td className="px-6 py-4 whitespace-nowrap" colspan="5">
                    <div className="text-sm h-80 flex items-center justify-center text-gray-500 ">
                      {error.message}
                    </div>
                  </td>
                ) : loading ? (
                  <td className="px-6 py-4 whitespace-nowrap" colspan="5">
                    {" "}
                    <div className="text-sm h-80 flex items-center flex-col justify-center text-center text-gray-500 ">
                      <p className="text-3xl">Loading...</p>
                      <p className="text-lg">wait a moment!</p>
                    </div>{" "}
                  </td>
                ) : filterdData.length < 1 ? (
                  <td className="px-6 py-4 whitespace-nowrap" colspan="5">
                    <div className="text-sm h-80 flex items-center flex-col justify-center text-center text-gray-500 ">
                      <p className="text-3xl">Data not found! </p>
                      <p className="text-lg">
                        {" "}
                        for advance search please click (search)
                      </p>
                    </div>
                  </td>
                ) : (
                  ""
                )}
                {filterdData.map((data) => (
                  <tr key={data.email || data.bookId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={data.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {data.name || data.bookId}
                          </div>
                          <div className="text-sm text-gray-500">
                            {data.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {data.schoolId || data.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {data.author || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.userType || data.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        value={data.schoolId}
                        to="/admin/studentedit"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
