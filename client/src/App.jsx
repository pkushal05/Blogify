import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./pages/ScrollToTop.jsx";
import { ScaleLoader } from "react-spinners";

/**
 * Lazy-loaded page components
 * Code splitting: Each component is loaded only when needed
 * Improves initial bundle size and app performance
 */
// Authentication pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

// Public pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About.jsx"));

// Protected app pages
const BlogDashboard = lazy(() => import("./pages/BlogDashboard.jsx"));
const Example = lazy(() => import("./pages/Example.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const ViewBlog = lazy(() => import("./pages/ViewBlog.jsx"));
const CreateBlogPost = lazy(() => import("./pages/CreateBlogPost.jsx"));
const EditBlog = lazy(() => import("./pages/EditBlog.jsx"));
const Explore = lazy(() => import("./pages/Explore.jsx"));

/**
 * Lazy-loaded layout components
 * Layouts define the common structure for different route groups
 */
const GuestLayout = lazy(() => import("./pages/layouts/GuestLayout.jsx")); // Public pages layout
const Layout = lazy(() => import("./pages/layouts/Layout.jsx")); // Main app layout
const AuthLayout = lazy(() => import("./pages/layouts/AuthLayout.jsx")); // Authentication wrapper

/**
 * App Component - Main application router with lazy loading
 * Features:
 * - Code splitting with lazy loading for performance
 * - Nested routing with layout components
 * - Route protection (public vs authenticated)
 * - Fallback loading states
 * - 404 error handling
 * - Scroll restoration between routes
 */
const App = () => {
  return (
    // Suspense wrapper provides fallback UI while lazy components load
    <Suspense
      fallback={
        // Full-screen loading spinner with app branding colors
        <div className="w-full h-screen bg-base-300 flex items-center justify-center">
          <ScaleLoader color="#b30808" />
        </div>
      }
    >
      {/* ScrollToTop component ensures page scrolls to top on route changes */}
      <ScrollToTop />

      <Routes>
        {/* 
          PUBLIC ROUTES GROUP
          Uses GuestLayout wrapper for common public page structure
          No authentication required
        */}
        <Route element={<GuestLayout />}>
          <Route index element={<Home />} /> {/* Root path "/" */}
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* 
          PROTECTED ROUTES GROUP
          Uses AuthLayout wrapper to ensure user authentication
          All nested routes require valid login
        */}
        <Route element={<AuthLayout />}>
          {/* 
            Main app routes with shared layout
            Layout component provides navigation, sidebar, etc.
          */}
          <Route path="app" element={<Layout />}>
            <Route index element={<BlogDashboard />} />{" "}
            {/* "/app" - main dashboard */}
            <Route path="profile/:id" element={<Profile />} />{" "}
            {/* User profile editing */}
            <Route path="create" element={<CreateBlogPost />} />{" "}
            {/* New blog creation */}
            <Route path="blogs/:id" element={<ViewBlog />} />{" "}
            {/* Individual blog viewing */}
            <Route path="blogs/edit/:id" element={<EditBlog />} />{" "}
            {/* Blog editing */}
            <Route path="explore" element={<Explore />} />{" "}
            {/* Blog discovery */}
          </Route>
        </Route>

        {/* 
          FALLBACK ROUTE - 404 Error Handler
          Catches all unmatched routes and displays friendly error
        */}
        <Route
          path="*"
          element={
            <div className="mt-25 text-4xl text-neutral p-20">
              😦 Page Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
