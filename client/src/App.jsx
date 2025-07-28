import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store/store.js";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ScrollToTop from "./pages/ScrollToTop.jsx";

//Component
import GuestLayout from "./pages/layouts/GuestLayout.jsx";
import About from "./pages/About.jsx";
import BlogDashboard from "./pages/BlogDashboard.jsx";
import Example from "./pages/Example.jsx";
import Layout from "./pages/layouts/Layout.jsx";
import AuthLayout from "./pages/layouts/AuthLayout.jsx";

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* Scroll to top on every route change */}
        <ScrollToTop />
        <Routes>
          <Route element={<GuestLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="app" element={<Layout />}>
              <Route index element={<BlogDashboard />} />
              <Route path="example" element={<Example />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <div className="mt-25 text-4xl text-neutral p-20">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
