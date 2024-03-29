/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../assets/The_logo_of_Nanjing_University_of_Information_Science_and_Technology.png";
import { Renders } from "../../store/Store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navber = () => {
  const [valid, setvalid] = useState(false);
  const [admin, setadmin] = useState(false);
  const [librarian, setLibrarian] = useState(false);
  const [profile, setprofile] = useState('');
  const [issuereq, setIssuereq] = useState(0)


  // calling for redirect route
  const navigate = useNavigate();

  const key = Cookies.get("auth");

  const [rerander] = useContext(Renders)
  useEffect(() => {
    axios
      .get("/api/librarian/dashboard", { headers: { auth: key } })
      .then((result) => {
        if (result.data.authError) {
            console.log(result.data.authError)
        } else {
         setIssuereq(result.data.issuerequest)
        }
      })
      .catch((err) => {
        console.log("custom error here" + err);
      });
  }, [rerander]);

  useEffect(() => {
    if (key) {
      const auth = key.split(' ')[1]
      const { name, userType, profile } = jwt(auth);
      
      if (name || profile) {
        setvalid(name);
        setprofile(profile)
      }
      if (name && userType === "admin") {
        setadmin(true);
      }
      if (name && userType === "librarian") {
        setLibrarian(true);
      }
    } else {
      setvalid(false);
      setadmin(false);
      setLibrarian(false)
    }
  }, [key]);

  const logoutHandler = () => {
    Cookies.set("auth", "");
    navigate("/login");
  };

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "About", href: "about", current: false },
  ];

  const adminNavigation = [
    { name: "Dashboard", href: "admin/dashboard", current: true },
    { name: "Students", href: "admin/studentlist", current: false },
    { name: "Librarians", href: "admin/librarianlist", current: false },
    { name: "Books", href: "admin/booklist", current: false },
  ];

  
  const librarianNavigation = [
    { name: "Dashboard", href: "librarian/dashboard", current: true },
    { name: "Students", href: "librarian/studentlist", current: false },
    { name: "Books", href: "librarian/booklist", current: false },
    { name: `issue request (${issuereq})`, href: "librarian/issuerequest", current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full z-20">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link to='/'>
                    <img
                      className="block lg:hidden h-10 w-auto"
                      src={logo}
                      alt="nuist"
                    />
                    <img
                      className="hidden lg:block h-9 w-auto"
                      src={logo}
                      alt="nuist"
                    />
                  </Link>
                </div>
                <Link to='/' className="hidden lg:block h-8 pl-3 pt-2 uppercase text-gray-100">
                  lms
                </Link>

                {admin ? (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {adminNavigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                          }
                          aria-current={"page"}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : librarian ? 

                (
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {librarianNavigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                          }
                          aria-current={"page"}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
                
                :(
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {valid ? (
                    <div>
                      <div className="flex space-x-2 text-gray-200">
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`http://localhost:5000/image/${profile}`}
                            alt=""
                          />
                        </Menu.Button>
                        <Menu.Button>{valid}</Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/setting"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/setting"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={logoutHandler}
                                href="##"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </div>
                  ) : (
                    <div>
                      <Menu.Button className="text-gray-300  ">
                        <NavLink to="/login" className="p-2 hover:text-white ">
                          login
                        </NavLink>
                        <span>/</span>
                        <NavLink
                          to="/register"
                          className="p-2 hover:text-white "
                        >
                          register
                        </NavLink>
                      </Menu.Button>
                    </div>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {admin ? 

            <div className="px-2 pt-2 pb-3 space-y-1">
            {adminNavigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
            </div>
            
          : librarian ? 

          <div className="px-2 pt-2 pb-3 space-y-1">
          {librarianNavigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block px-3 py-2 rounded-md text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
        
          :
          
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          }
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navber;
