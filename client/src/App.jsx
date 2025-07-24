import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Functions
import { isLoggedIn } from './api/userApi.js'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

//Component
import Navbar from './components/Navbar'
import GuestNavbar from './components/GuestNavbar.jsx'


const App = () => {

  const { pathname } = useLocation();

  // Define routes where you DON'T want any navbar
  const noNavPaths = ["/login", "/signup"];

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   async function checkAuth() {
  //     const status = await isLoggedIn();


  //     setLoggedIn(status.isLoggedIn)
  //   }

  //   checkAuth();
  // },[])

  // if (loggedIn === null) {
  //   // Still checking
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      {/* {
        loggedIn ? <Navbar /> : <Login />
      } */}
      {!noNavPaths.includes(pathname) && <GuestNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App