import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Admin from '../admin/Admin'
import Home from '../home/Home'
import Navber from '../home/Navber'
import Login from '../login/Login'
import Signup from '../signup/Signup'

function Routers() {
    return (
        <Router>
            <Navber />
            <Routes>
            <Route path="/login" element= {<Login />} />
            <Route path="/register" element= {<Signup />} />
            <Route path="/admin" element= {<Admin />} />
            <Route path="/home" element= {<Home />} />
            </Routes>
           
        </Router>
    )
}

export default Routers
