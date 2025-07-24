import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, House } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.username.trim())
      newErrors.username = "Username is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully!");
    }, 2000);
  };

  return (
    <div className=" relative min-h-screen flex items-center justify-center bg-base-300 p-4">
      <Link className="absolute top-12 left-10 btn btn-ghost btn-square" to="/">
        <House />
      </Link>
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl font-[Poppins]">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary-content">
              <span className="text-2xl text-primary">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral">Create Account</h2>
            <p className="text-neutral-content mt-1">
              Join us and start your journey today
            </p>
          </div>

          {/* Name Fields */}
          {/* Username Field */}
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              className={`input w-full focus:outline-none focus:ring-2 focus:ring-neutral-content ${
                errors.username ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.username}
                </span>
              </label>
            )}
          </div>

          {/* Email Field */}
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
            {errors.email && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.email}
                </span>
              </label>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="label block text-sm font-medium text-neutral mb-1">
              Password
            </label>
            <div className="input-group relative">
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
                <span className="label-text-alt text-error">
                  {errors.password}
                </span>
              </label>
            )}
          </div>

          {/* Confirm Password Field */}
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
                errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <label className="label pt-1">
                <span className="label-text-alt text-error">
                  {errors.confirmPassword}
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
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-sm text-neutral-content mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline ml-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
