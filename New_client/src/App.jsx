import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Userprofile from './components/Userprofile';
import Verified from './components/Verifiedmail';
import Forgetpassword from './components/ForgetPassword/Forgetpassword';
import Resetpassword from './components/ForgetPassword/Resetpassword';
import Resetsuccess from './components/ForgetPassword/Resetsuccess';
import ProjectManage from './components/MainPage/ProjectManage';

//components

function App() {

  return (
    <Router>
      <Navbar />
      <div className="h-dvh bg-[#FEEFAD] dark:bg-[#1C0C5B] flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/verified" element={<Verified />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/resetsuccess" element={<Resetsuccess />} />
          <Route path="/projectmanage" element={<ProjectManage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
