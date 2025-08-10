import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../features/thunks/userThunks.js";
import { Eye, EyeOff, House } from "lucide-react";

/**
 * Signup Component - User registration form with validation
 * Features:
 * - Multi-field form (username, email, password, confirm password)
 * - Real-time form validation
 * - Password visibility toggle
 * - Automatic login after successful registration
 * - Loading states and error handling
 * - Redirect protection for authenticated users
 */
const Signup = () => {
  // Redux state management - get user authentication state and dispatch actions
  const { isLoggedIn, loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local form state - controlled inputs for all form fields
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // UI state management
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errors, setErrors] = useState({}); // Form validation errors
  const [isLoading, setIsLoading] = useState(false); // Local loading state for UX

  /**
   * Handles input changes for all form fields
   * Clears validation errors when user starts typing in a field
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the specific field in formData
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing (better UX)
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Validates all form fields before submission
   * Returns object with field names as keys and error messages as values
   */
  const validateForm = () => {
    const newErrors = {};

    // Username validation - required field
    if (!formData.userName.trim()) newErrors.userName = "Username is required";

    // Email validation - required and must be valid format
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation - required and minimum length
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation - must match original password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  /**
   * Handles form submission with two-step process: register then auto-login
   * Validates form, registers user, then automatically logs them in
   */
  const handleSubmit = async () => {
    // Validate all form fields before submission
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors and start loading
    setIsLoading(true);
    setErrors({});

    // Prepare user data for registration (excluding confirmPassword)
    const userData = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Step 1: Register the user
      const registerResult = await dispatch(register(userData));

      // Step 2: If registration successful, automatically log them in
      if (register.fulfilled.match(registerResult)) {
        // Delay login slightly for better UX (shows registration completed)
        setTimeout(async () => {
          await dispatch(
            login({ email: formData.email, password: formData.password })
          );
          setIsLoading(false);
        }, 1000);
      } else {
        // Registration failed, stop loading without attempting login
        setIsLoading(false);
      }
    } catch (error) {
      // Handle any unexpected errors
      setIsLoading(false);
    }
  };

  /**
   * Effect to handle server messages and reset form state
   * Manages loading state and form reset when server responds
   */
  useEffect(() => {
    if (message) {
      // Sync local loading state with Redux loading state
      setIsLoading(loading);
      // Reset form fields to prevent stale data
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Display server message as form error
      setErrors({ form: message });
    }
  }, [message]);

  // Redirect authenticated users to main app (route protection)
  if (isLoggedIn) {
    return <Navigate to={"/app"} replace />;
  }

  return (
    // Main container with full screen height and centered layout
    <div className="relative min-h-screen flex items-center justify-center bg-base-300 p-4">
      {/* Home navigation button - positioned absolutely in top-left */}
      <Link className="absolute top-12 left-10 btn btn-ghost btn-square" to="/">
        <House />
      </Link>

      {/* Main signup card */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl font-[Poppins]">
        <div className="card-body">
          {/* Header section with branding and title */}
          <div className="text-center mb-6">
            {/* Rocket emoji as visual branding */}
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary-content">
              <span className="text-2xl text-primary">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral">Create Account</h2>
            <p className="text-neutral-content mt-1">
              Join us and start your journey today
            </p>
          </div>

          {/* Username input field */}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="johndoe"
              value={formData.userName}
              onChange={handleChange}
              className={`input w-full focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                errors.userName ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {/* Username validation error display */}
            {errors.userName && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.userName}
                </span>
              </label>
            )}
          </div>

          {/* Email input field with validation */}
          <div className="form-control mt-4">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`input w-full focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {/* Email validation error display */}
            {errors.email && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.email}
                </span>
              </label>
            )}
          </div>

          {/* Password input field with visibility toggle */}
          <div className="form-control mt-4">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Password
            </label>
            <div className="input-group relative">
              {/* Password input with dynamic type based on visibility state */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className={`input w-full focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {/* Eye icon button to toggle password visibility */}
              <button
                type="button"
                className="btn btn-ghost btn-square absolute right-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Password validation error display */}
            {errors.password && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.password}
                </span>
              </label>
            )}
          </div>

          {/* Confirm password input field */}
          <div className="form-control mt-4">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input w-full focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {/* Confirm password validation error display */}
            {errors.confirmPassword && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.confirmPassword}
                </span>
              </label>
            )}
          </div>

          {/* Submit button with loading state */}
          <div className="form-control mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading} // Prevent multiple submissions
              className="btn btn-primary btn-block"
            >
              {/* Dynamic button text based on loading state */}
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          {/* Footer with link to login page */}
          <p className="text-center text-sm text-neutral-content mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Server error message display - positioned at bottom center */}
      {errors.form && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-3 rounded-lg shadow-md">
          {errors.form}
        </div>
      )}
    </div>
  );
};

export default Signup;
