import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/slices/userSlice";

// Icons
import { User, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    if (profilePic) formData.append("profilePic", profilePic);
    dispatch(updateProfile(formData));
  };

  return (
    <div className="w-full min-h-screen bg-base-300 font-[Poppins] text-neutral flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card bg-base-100 rounded-2xl shadow-lg w-full max-w-lg flex flex-col items-center"
      >
        <div className="card-body w-full">
          <div className="text-center mt-3 mb-4">
            <h2 className="text-2xl font-bold text-neutral">Edit Profile</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="form flex flex-col items-center w-full"
          >
            <div className="flex flex-col items-center w-full">
              <div className="relative w-36 h-36 cursor-pointer border rounded-full overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-base-200 flex items-center justify-center text-base-content/50">
                    <User size={32} />
                  </div>
                )}
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <div className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-1">
                  <Plus size={16} />
                </div>
              </div>

              {/* Username Field */}
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
                  className="w-full input input-bordered bg-base-200 text-neutral"
                />
              </div>

              <button type="submit" className="mt-6 w-full btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
