import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/thunks/userThunks.js";
import { clearUserMessages } from "../features/slices/userSlice.js";

// Icons
import { User, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, message, showSuccessMessage, loading } = useSelector(
    (state) => state.user
  );

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState(user.userName);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [preview, setPreview] = useState(user.profilePic || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setProfilePic(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "Username can’t be empty";
    }
    if (profilePic instanceof File) {
      // Only allow images
      if (!profilePic.type.startsWith("image/")) {
        newErrors.profilePic = "Profile picture must be an image file";
      }
      // Limit to 2 MB
      const MAX_SIZE = 2 * 1024 * 1024;
      if (profilePic.size > MAX_SIZE) {
        newErrors.profilePic = "Image must be smaller than 2 MB";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 2. Build FormData
    const data = new FormData();
    data.append("userName", userName);
    // only append if the user actually picked a new file
    if (profilePic instanceof File) {
      data.append("profilePic", profilePic);
    }
    try {
      await dispatch(update(data));
    } catch (error) {}
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(clearUserMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, dispatch]);

  return (
    <div className="w-full min-h-screen relative bg-base-300 font-[Poppins] text-neutral flex items-center justify-center p-4">
      {showSuccessMessage && (
        <div className="absolute z-30 border right-5 top-30 p-5 rounded-3xl text-neutral select-none bg-neutral-content">
          ✅ {message}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card bg-base-100 rounded-2xl shadow-lg w-full max-w-lg flex flex-col items-center mt-25"
      >
        <div className="card-body w-full">
          <div className="text-center mt-3 mb-4">
            <h2 className="text-2xl font-bold text-neutral">Edit Profile</h2>
          </div>
          <form onSubmit={handleSubmit} className="form w-full">
            <div className="flex flex-col items-center w-full">
              <div className="relative w-36 h-36 cursor-pointer border rounded-full">
                {preview && (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <Plus />
                </label>
                <input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  accept="image/*"
                  className=" absolute inset-0 opacity-0 cursor-pointer w-36 h-36 rounded-full"
                  onChange={handleImageChange}
                />
                {errors.profilePic && (
                  <label className="absolute -left-14 label mt-2">
                    <span className="label-text-alt text-error">
                      {errors.profilePic}
                    </span>
                  </label>
                )}
              </div>
              <div className="w-full mt-6">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Username
                </label>
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
                {errors.userName && (
                  <label className="label pt-1">
                    <span className="label-text-alt text-error">
                      {errors.userName}
                    </span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 w-full btn btn-primary ${
                  loading && "opacity-80 cursor-not-allowed"
                }`}
              >
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
