import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdDashboard from "../admin/AdDashboard";
import Admin from "../admin/Admin";
import BookList from "../admin/BookList";
import LibrarianList from "../admin/LibrarianList";
import StudentAdd from "../admin/StudentAdd";
import StudentEdit from "../admin/StudentEdit";
import StudentList from "../admin/studentList";
import StudentView from "../admin/StudentView";
import ErrorPage from "../ErrorPage";
import Home from "../home/Home";
import Navber from "../home/Navber";
import {Test, Case1, Case2} from "../home/Test";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import UserSetting from "../User.js/UserSetting";
// import AdminRoute from './AdminRoute'

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

        {/* admin route */}
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

        {/* invalid route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
