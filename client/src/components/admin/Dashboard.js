import React from "react";
import adminIcon from '../../assets/adminIcon.ico'
import librarianIcon from '../../assets/librarianIcon.png'
import studentIcon from '../../assets/studentIcon.png'
import bookIcon from '../../assets/bookIcon.png'
const Dashboard = (props) => {
  const [data] = props.data;
  const { visible, routes } = props;

  const [search, setSearch] = React.useState("");

  


  return (
    <div
      className={`flex flex-col pt-20 p-5 ${
        visible ? " ml-80 lg:w-9/12" : ""
      } `}
    >
      <div className=" w-full h-28 flex justify-between items-center bg-blue-50 rounded-t-md">
        <div>
          <div className="p-2 text-3xl">{routes}</div>
          <div className="px-2 pb-2">Admin / {routes}</div>
        </div>
        <div>
        
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow  border-b border-gray-200 sm:rounded-lg flex">
               <HeadCard imgs={adminIcon} count={data.admins} title="Total Admin"  />
               <HeadCard imgs={librarianIcon} count={data.librarians} title="Total Librarians"  />
               <HeadCard imgs={studentIcon} count={data.students} title="Total Students"  />
               <HeadCard imgs={bookIcon} count={data.books} title="Total Books"  />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeadCard = (props) =>{
    const {imgs, count, title} = props;
    return(
        <div className="flex justify-center items-center space-x-2 w-3/12 h-32 m-3 rounded-tl-3xl rounded-br-3xl border-2">
        <div className="w-12 h-auto m-2">
            <img src={imgs} alt="adminicon" />
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-600">{count}+</p>
            <p className="text-gray-600 mt-1">{title}</p>
        </div>
    </div>
    )

}

export default Dashboard;
