import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/thunks/userThunks.js";
import { clearUserMessages } from "../features/slices/userSlice.js";

// Icons
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Profile Component - Allows users to edit their profile information
 * Features:
 * - Profile picture upload with preview
 * - Username editing
 * - Form validation
 * - Success message display
 * - Loading states
 */
const Profile = () => {
  // Redux hooks for state management and dispatching actions
  const dispatch = useDispatch();
  const { user, message, showSuccessMessage, loading } = useSelector(
    (state) => state.user
  );

  // Local component state for form handling and validation
  const [errors, setErrors] = useState({}); // Form validation errors
  const [userName, setUserName] = useState(user.userName); // Controlled input for username
  const [profilePic, setProfilePic] = useState(user.profilePic || ""); // Selected profile picture file
  const [preview, setPreview] = useState(user.profilePic || ""); // Preview URL for profile picture

  /**
   * Handles profile picture file selection
   * Creates a preview URL and stores the file for upload
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for preview
      const url = URL.createObjectURL(file);
      setPreview(url);
      setProfilePic(file);
    }
  };

  /**
   * Handles form submission with validation
   * Validates username and profile picture before dispatching update action
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate username - cannot be empty
    if (!userName.trim()) {
      newErrors.userName = "Username can't be empty";
    }

    // Validate profile picture if a new file was selected
    if (profilePic instanceof File) {
      // Only allow image files
      if (!profilePic.type.startsWith("image/")) {
        newErrors.profilePic = "Profile picture must be an image file";
      }
      // Limit file size to 2 MB
      const MAX_SIZE = 2 * 1024 * 1024;
      if (profilePic.size > MAX_SIZE) {
        newErrors.profilePic = "Image must be smaller than 2 MB";
      }
    }

    // If validation errors exist, display them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build FormData for multipart form submission (required for file uploads)
    const data = new FormData();
    data.append("userName", userName);
    // Only append profile picture if user selected a new file
    if (profilePic instanceof File) {
      data.append("profilePic", profilePic);
    }

    try {
      // Dispatch the update action with form data
      await dispatch(update(data));
    } catch (error) {
      // Error handling is managed by Redux thunk
    }
  };

  /**
   * Effect to automatically clear success messages after 3 seconds
   * Provides better UX by not requiring manual dismissal
   */
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(clearUserMessages());
      }, 3000);
      // Cleanup timer on component unmount or dependency change
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, dispatch]);

  return (
    // Main container with full screen height and centered layout
    <div className="w-full min-h-screen relative bg-base-300 font-[Poppins] text-neutral flex items-center justify-center p-4">
      {/* Success message toast - positioned absolutely in top-right */}
      {showSuccessMessage && (
        <div className="absolute z-30 border right-5 top-30 p-5 rounded-3xl text-neutral select-none bg-neutral-content">
          ✅ {message}
        </div>
      )}

      {/* Main profile card with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} // Start slightly smaller and transparent
        animate={{ opacity: 1, scale: 1 }} // Animate to full size and opacity
        transition={{ duration: 0.5 }} // Animation duration
        className="card bg-base-100 rounded-2xl shadow-lg w-full max-w-lg flex flex-col items-center mt-25"
      >
        <div className="card-body w-full">
          {/* Page header */}
          <div className="text-center mt-3 mb-4">
            <h2 className="text-2xl font-bold text-neutral">Edit Profile</h2>
          </div>

          {/* Profile form */}
          <form onSubmit={handleSubmit} className="form w-full">
            <div className="flex flex-col items-center w-full">
              {/* Profile picture upload section */}
              <div className="relative w-36 h-36 cursor-pointer border rounded-full">
                {/* Profile picture preview - shows current or newly selected image */}
                {preview && (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}

                {/* Plus icon overlay for indicating upload functionality */}
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <Plus />
                </label>

                {/* Hidden file input - triggered by clicking the image area */}
                <input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  accept="image/*" // Only allow image files
                  className="absolute inset-0 opacity-0 cursor-pointer w-36 h-36 rounded-full"
                  onChange={handleImageChange}
                />

                {/* Error message for profile picture validation */}
                {errors.profilePic && (
                  <label className="absolute -left-14 label mt-2">
                    <span className="label-text-alt text-error">
                      {errors.profilePic}
                    </span>
                  </label>
                )}
              </div>

              {/* Username input section */}
              <div className="w-full mt-6">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Username
                </label>

                {/* Controlled username input */}
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full input border-0 focus:ring-0 focus:ring-offset-transparent bg-base-200 text-neutral ${
                    errors.userName ? "border-red-500" : "border-neutral"
                  }`}
                />

                {/* Error message for username validation */}
                {errors.userName && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error">
                      {errors.userName}
                    </span>
                  </label>
                )}
              </div>

              {/* Submit button with loading state */}
              <button
                type="submit"
                disabled={loading} // Disable during API calls
                className={`mt-6 w-full btn btn-primary ${
                  loading && "opacity-80 cursor-not-allowed"
                }`}
              >
                {/* Dynamic button text based on loading state */}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
