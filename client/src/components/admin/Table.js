import React from 'react'

 const Table = (props) => {

    
 const [data] = props.data;
 const [theader] = props.tableHeader;
 const {visible, error} = props;
 
    return (
        <div
        className={`flex flex-col pt-20 p-5 ${
          visible ? " ml-80 lg:w-9/12" : ""
        } `}
      >
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow  border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {theader.map((heads)=>{
                      
                      return(
                    <th
                        key={heads}
                      scope="col"
                      className="px-6 py-3 w-4/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                     {heads}
                    </th>
                      )

                    })}
                    
                    {/* <th
                      scope="col"
                      className="px-6 py-3 w-3/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      School ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 w-3/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      userType
                    </th> */}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {error ? (
                    <td className="px-6 py-4 whitespace-nowrap" colspan="5">
                      <div className="text-sm h-96 flex items-center justify-center text-gray-500 ">
                        {error.message}
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                  {data.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={person.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {person.schoolId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.userType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                        value = {person.schoolId}
                          href="##"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Table;