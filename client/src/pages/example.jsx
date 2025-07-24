<div className="min-h-screen  flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl text-white">🚀</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      <p className="text-gray-600 mt-2">Join us and start your journey today</p>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.firstName ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.lastName ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.email ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <div className="text-red-600 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.password ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Create password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <div className="text-red-600 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.confirmPassword ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <div className="text-red-600 text-sm mt-1">
            {errors.confirmPassword}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </div>

    <div className="mt-6 text-center">
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link to={"/login"} className="text-emerald-600 font-medium">
          Sign In
        </Link>
      </p>
    </div>
  </div>
</div>;
