import logo from "../../assets/The_logo_of_Nanjing_University_of_Information_Science_and_Technology.png";
import { LockClosedIcon } from "@heroicons/react/solid";

function Signup() {
  return (
    <>
      <div className="bg-blue-100 min-h-screen">
        <div className="">
          <img className="mx-auto pt-4 h-16 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Sign Up account
          </h2>
        </div>
        <form action="/signup" method="post">
          <Box
            fore = "school-id"
            id="school-id"
            name="schoolId"
            level="School ID"
            placeholder="School ID"
            type = "number"
          />
          <Box
            fore="fullname"
            id="fullname"
            name="fullname"
            autoComplete="fullname"
            level="Full Name"
            placeholder="Full Name"
            type = "text"
          />
          <Box
            fore="email" 
            id="email"
            name="email"
            level="Email"
            placeholder="Email"
            type = "email"
          />
          <Box
            fore="password" 
            id="password"
            name="password"
            level="Password"
            placeholder="password"
            type = "password"
          />
          <Box
            fore="conpassword" 
            id="conpassword"
            name="conpassword"
            level="Comfirm Password"
            placeholder="Confirm Password"
            type = "password"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className=" relative sm:w-80 lg:w-80 md:w w-full m-5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
        <p className="flex justify-center text-red-500"> your password format was wrong!</p>
      </div>
    </>
  );
}

const Box = (props) => {
  const { id, name, autoComplete,fore, level, placeholder, type } = props;
  return (
    <div>
      <div className="flex justify-center mt-4  ">
        <div className="flex justify-between bg-blue-100 rounded-md">
          <label
            htmlFor={fore}
            className=" w-60 lg:w-32 items-center flex "
          >
            {level}
          </label>
          <input
            id={id}
            name={name}
            autoComplete={autoComplete}
            type={type}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-100 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
