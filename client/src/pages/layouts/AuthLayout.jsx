import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "../../features/thunks/userThunks.js";
import { Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

/**
 * AuthLayout Component
 * - Protects routes by checking if the user is logged in before rendering child routes
 * - Dispatches checkLoginStatus thunk on mount to verify user session
 * - Shows loading spinner while session check is in progress
 * - If not logged in after check, shows message prompting login
 * - If logged in, renders nested routes via <Outlet />
 */
const AuthLayout = () => {
  const dispatch = useDispatch();
  // Get logged-in state from Redux store
  const { isLoggedIn } = useSelector((state) => state.user);
  // Local state to track if session check is complete
  const [checked, setChecked] = useState(false);

  // On mount, dispatch checkLoginStatus to verify session
  useEffect(() => {
    dispatch(checkLoginStatus())
      .catch(() => {}) // Silently catch errors
      .finally(() => setChecked(true)); // Mark check complete regardless of outcome
  }, [dispatch]);

  // While session check is ongoing, show spinner and message
  if (!checked) {
    return (
      <div className="w-full h-screen bg-base-300 flex flex-col items-center justify-center">
        <ScaleLoader color="#b30808" />
        <p className="text-lg">Checking your session....</p>
      </div>
    );
  }

  // If session check complete but user not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen bg-base-300 flex flex-col items-center justify-center">
        <ScaleLoader color="#b30808" />
        <p className="text-lg">😏 Please log in the access this content..</p>
      </div>
    );
  }

  // If logged in, render nested child routes
  return <Outlet />;
};

export default AuthLayout;
