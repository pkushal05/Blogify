import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

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
      <Navbar />
      <Home />
        

    </>
  );
}

export default App