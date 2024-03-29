import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdDashboard from "../admin/AdDashboard";
import BookList from "../common/BookList";
import LibrarianList from "../admin/LibrarianList";
import StudentAdd from "../common/StudentAdd";
import StudentEdit from "../common/StudentEdit";
import StudentList from "../common/studentList";
import UserView from "../common/UserView";
import BookShow from "../book/BookShow";
import ErrorPage from "../ErrorPage";
import Home from "../home/Home";
import Navber from "../home/Navber";
import {Test} from "../home/Test";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import UserSetting from "../User.js/UserSetting";
import LibDashboard from "../librarian/LibDashboard";
import LibDeactiveUser from "../librarian/LibDeactiveUser";
import LibIssueList from "../librarian/LibIssueList";
import BookView from "../common/BookView";
import BookEdit from "../common/BookEdit";
import BookAdd from "../common/BookAdd";
import LibrarianAdd from "../admin/LibrarianAdd";
import About from "../About";
import ProtectedLibrarian from "../librarian/ProtectedLibrarianRoute";
import ProtectedAdmin from "../admin/ProtectedAdmin";

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
        <Route path="about" element={<About />} />
        <Route path="book/:bookId" element={<BookShow />} />

        {/* admin route start from here */}
        <Route path="admin/" element={<ProtectedAdmin />}>
          <Route path="dashboard" element={<AdDashboard />} />
          <Route path="libdashboard" element={<LibDashboard />} />

          {/* admin component student's route */}
          <Route path="studentlist/" element={<StudentList />} />
          <Route path="studentedit/:id" element={<StudentEdit />} />
          <Route path="studentadd/"  element={<StudentAdd />} />
          <Route path="studentview/:schoolId" element={<UserView />} />

          {/* admin component librarian's route */}
          <Route path="librarianlist/" element={<LibrarianList />} />
          <Route path='librairanadd/' element={<LibrarianAdd />} />

          {/* admin component book's route */}
          <Route path="booklist/" element={<BookList />} />
          <Route path="bookview/:bookId" element={<BookView />} />
          <Route path="bookedit/:id" element={<BookEdit />} />
          <Route path="bookadd" element={<BookAdd />} />

        </Route>
        {/* admin route ends here */}

        {/* librarian route start from here */}
        <Route path='librarian/' element={<ProtectedLibrarian />} >
          <Route path="dashboard" element={<LibDashboard />} />
          <Route path="deactiveuser" element={<LibDeactiveUser />} />
          
          <Route path="booklist" element={<BookList />} />
          <Route path="bookview/:bookId" element={<BookView />} />
          <Route path="bookedit/:id" element={<BookEdit />} />
          <Route path="bookadd" element={<BookAdd />} />

          <Route path="studentlist/" element={<StudentList />} />
          <Route path="studentadd/"  element={<StudentAdd />} />
          <Route path="studentview/:schoolId" element={<UserView />} />
          <Route path="studentedit/:id" element={<StudentEdit />} />
          <Route path="issuerequest" element={<LibIssueList />} />

        </Route>

        {/* invalid route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
