import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdDashboard from "../admin/AdDashboard";
import Admin from "../admin/Admin";
import BookList from "../admin/BookList";
import LibrarianList from "../admin/LibrarianList";
import StudentEdit from "../admin/StudentEdit";
import StudentList from "../admin/studentList";
import Home from "../home/Home";
import Navber from "../home/Navber";
import Login from "../login/Login";
import Signup from "../signup/Signup";
// import AdminRoute from './AdminRoute'

function Routers() {
  return (
    <Router>
      <Navber />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="dashboard/*" element={<AdDashboard />} />

          {/* admin component student's route */}
          <Route path="studentlist/*" element={<StudentList />} />
          <Route path="studentedit/*" element={<StudentEdit />} />

          {/* admin component librarian's route */}
          <Route path="librarianlist/*" element={<LibrarianList />} />

          {/* admin component book's route */}
          <Route path="booklist/*" element={<BookList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routers;
