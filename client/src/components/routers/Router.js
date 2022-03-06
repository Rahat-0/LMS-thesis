import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdDashboard from "../admin/AdDashboard";
import Admin from "../admin/Admin";
import BookList from "../common/BookList";
import LibrarianList from "../admin/LibrarianList";
import StudentAdd from "../common/StudentAdd";
import StudentEdit from "../common/StudentEdit";
import StudentList from "../common/studentList";
import StudentView from "../common/StudentView";
import BookShow from "../book/BookShow";
import ErrorPage from "../ErrorPage";
import Home from "../home/Home";
import Navber from "../home/Navber";
import {Test} from "../home/Test";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import UserSetting from "../User.js/UserSetting";
import Librarian from '../librarian/Librarian';
import LibDashboard from "../librarian/LibDashboard";
import LibDeactiveUser from "../librarian/LibDeactiveUser";

function Routers() {
  return (
    <Router>
      <Navber />
      <Routes>
        {/* testing route for test purpose */}
        <Route path='test' element={<Test />} />
        

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="setting/" element={<UserSetting />} />

        <Route path="book/:bookId" element={<BookShow />} />

        {/* admin route start from here */}
        <Route path="admin/" element={<Admin />}>
          <Route path="dashboard" element={<AdDashboard />} />

          {/* admin component student's route */}
          <Route path="studentlist/" element={<StudentList />} />
          <Route path="studentedit/:id" element={<StudentEdit />} />
          <Route path="studentadd/"  element={<StudentAdd />} />
          <Route path="studentview/:schoolId" element={<StudentView />} />

          {/* admin component librarian's route */}
          <Route path="librarianlist/" element={<LibrarianList />} />

          {/* admin component book's route */}
          <Route path="booklist/" element={<BookList />} />
        </Route>
        {/* admin route ends here */}

        {/* librarian route start from here */}
        <Route path='librarian/' element={<Librarian />} >
          <Route path="dashboard" element={<LibDashboard />} />
          <Route path="deactiveuser" element={<LibDeactiveUser />} />
          
          <Route path="booklist" element={<BookList />} />
          <Route path="studentlist/" element={<StudentList />} />
          <Route path="studentadd/"  element={<StudentAdd />} />
          <Route path="studentview/:schoolId" element={<StudentView />} />
          <Route path="studentedit/:id" element={<StudentEdit />} />

        </Route>

        {/* invalid route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
