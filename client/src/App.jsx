import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store/store.js";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import { ScaleLoader } from "react-spinners";

// Lazy Load Pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About.jsx"));
const BlogDashboard = lazy(() => import("./pages/BlogDashboard.jsx"));
const Example = lazy(() => import("./pages/Example.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"))
import Loading from "./components/Loading.jsx";
import BlogCard from "./components/BlogCard.jsx";

// Lazy Load Layouts
const GuestLayout = lazy(() => import("./pages/layouts/GuestLayout.jsx"));
const Layout = lazy(() => import("./pages/layouts/Layout.jsx"));
const AuthLayout = lazy(() => import("./pages/layouts/AuthLayout.jsx"));

const App = () => {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="w-full h-screen bg-base-300 flex items-center justify-center">
            <ScaleLoader color="#b30808" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route element={<GuestLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="loading" element={<BlogCard />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<AuthLayout />}>
            <Route path="app" element={<Layout />}>
              <Route index element={<BlogDashboard />} />
              <Route path="profile/:id" element={<Profile />}/>
              <Route path="example" element={<Example />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <div className="mt-25 text-4xl text-neutral p-20">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;
