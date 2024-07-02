import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Userprofile from './components/Userprofile';

//components

function App() {

  return (
    <Router>
      <Navbar />
      <div className="h-dvh bg-[#FEEFAD] flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<Userprofile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
