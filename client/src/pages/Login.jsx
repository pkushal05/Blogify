import React, { use } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Mail, Lock, House, AlertCircle } from "lucide-react";
import { login } from "../features/thunks/userThunks.js";
import { motion } from "framer-motion";
import { set } from "mongoose";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (message) {
      setErrors({ form: message });
    }
  }, [message]);

  if (isLoggedIn) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-base-300">
      <Link className="absolute top-12 left-10 btn btn-ghost btn-square" to="/">
        <House />
      </Link>
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl font-[Poppins] relative">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary-content">
              <span className="text-2xl text-primary">🔐</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral">Welcome Back</h2>
            <p className="text-neutral-content mt-1">
              Sign in to your account to continue
            </p>
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <label className="label pt-1">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.email}
                </span>
              </label>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="block text-sm font-medium text-neutral mb-1">
              Password
            </label>
            <div className="input-group relative">
              <div className="absolute top-2 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="btn btn-ghost btn-square absolute right-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <label className="label pt-1">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.password}
                </span>
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary btn-block"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-sm text-neutral-content mt-4">
            Don’t have an account?
            <Link to="/signup" className="text-primary hover:underline ml-2">
              Sign Up
            </Link>
          </p>
        </div>
        {errors.form && (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-3 rounded-lg shadow-md"
          >
            {errors.form}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Login;
