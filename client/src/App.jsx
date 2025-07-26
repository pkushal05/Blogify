import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Functions
import { isLoggedIn } from './api/userApi.js'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ScrollToTop from './pages/ScrollToTop.jsx'

//Component
import Navbar from './components/Navbar'
import GuestNavbar from './components/GuestNavbar.jsx'
import About from './pages/About.jsx'
import BlogDashboard from './pages/BlogDashboard.jsx'


const App = () => {

  const { pathname } = useLocation();

  // Define routes where you DON'T want any navbar
  const noNavPaths = ["/login", "/signup"];

  return (
    <>
      <ScrollToTop />
      {!noNavPaths.includes(pathname) && <GuestNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path="*" element={<div className='mt-25 text-4xl text-neutral p-20'>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App