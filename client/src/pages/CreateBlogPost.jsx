import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { create } from "../features/thunks/blogThunks.js";

// Icons
import { Upload } from "lucide-react";

/**
 * CreateBlogPost Component - Form for creating new blog posts
 * Features: Image upload with preview, form validation, category selection
 */
const CreateBlogPost = () => {
  const dispatch = useDispatch();
  const { message, blog, showSuccessMessage, loading } = useSelector(
    (state) => state.blog
  );
  const navigate = useNavigate();

  // Controls navigation after successful blog creation
  const [redirect, setRedirect] = useState(false);

  // Form data state containing all blog post fields
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    content: "",
    category: "",
  });

  // Form validation errors for each field
  const [errors, setErrors] = useState({});
  // Image preview URL for thumbnail display
  const [preview, setPreview] = useState("");

  /**
   * Handles input changes for text fields and clears related errors
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Handles thumbnail image selection and creates preview
   * @param {Event} e - File input change event
   */
  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
      // Clear thumbnail error if exists
      if (errors.thumbnail) {
        setErrors((prev) => ({ ...prev, thumbnail: "" }));
      }
    }
  };

  /**
   * Validates all form fields according to business rules
   * @returns {boolean} - True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.title.length < 5 || formData.title.length > 100) {
      newErrors.title = "Title must be between 5 to 100 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (formData.content.length < 50 || formData.content.length > 20000) {
      newErrors.content = "Content must be between 50 to 20000 characters";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission and blog creation
   * Creates FormData object for file upload and dispatches create action
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("category", formData.category);
    submitData.append("thumbnail", formData.thumbnail);

    try {
      await dispatch(create(submitData));

      // Reset form on success
      setFormData({
        thumbnail: null,
        title: "",
        content: "",
        category: "",
      });
      setPreview("");
      setRedirect(true);
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  // Navigate to dashboard after successful creation
  if (redirect) {
    return navigate("/app");
  }

  // Available blog categories for selection
  const categories = ["Technology", "Lifestyle", "Design", "Business"];

  return (
    <div className="w-full min-h-screen bg-base-300 font-[Poppins]">
      <div className="container w-full mx-auto px-4 py-8 max-w-4xl ">
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 mt-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Create New Post
            </h1>
            <p className="text-base-content/70">
              Share your thoughts with the world
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thumbnail Upload with drag-and-drop functionality */}
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text text-base-content font-medium">
                  Thumbnail Image
                </span>
              </label>
              <div className="relative w-full h-72">
                <div
                  className={`relative border-2 border-dashed rounded-xl overflow-hidden h-72 flex flex-col items-center justify-center bg-base-200/50 hover:bg-base-200 transition-colors ${
                    errors.thumbnail ? "border-red-300" : "border-base-300"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Thumbnail image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <label
                      htmlFor="thumbnail"
                      className={`flex flex-col items-center z-0 cursor-pointer text-xs sm:text-lg`}
                    >
                      <Upload className="animate-bounce" />
                      Click to Upload or Drag and Drop
                    </label>
                  )}
                  <input
                    onChange={handlePreview}
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full h-72 opacity-0 absolute inset-0 cursor-pointer z-10"
                  />
                </div>
                {errors.thumbnail && (
                  <label className="absolute left-0 label text-sm">
                    <span className="label-text-alt text-error">
                      {errors.thumbnail}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Title Input with character length validation */}
            <div className="form-control relative">
              <label htmlFor="title" className="label mb-1">
                <span className="label-text text-base-content font-medium ">
                  Title
                </span>
              </label>
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter your blog post title..."
                  className={`input input-lg w-full bg-base-200 focus:bg-base-100 placeholder:text-sm transition-colors ${
                    errors.title ? "border-red-300" : "border-base-300"
                  }`}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              {errors.title && (
                <label className="absolute left-0 label text-sm">
                  <span className="label-text-alt text-error">
                    {errors.title}
                  </span>
                </label>
              )}
            </div>

            {/* Category Selection Dropdown */}
            <div className="form-control relative">
              <label htmlFor="category" className="label mb-1">
                <span className="label-text text-base-content font-medium">
                  Category
                </span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`select select-bordered w-full bg-base-200 focus:bg-base-100 transition-colors ${
                    errors.category ? "border-red-300" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <label className="absolute left-0 label text-sm">
                  <span className="label-text-alt text-error">
                    {errors.category}
                  </span>
                </label>
              )}
            </div>

            {/* Content Textarea with character limit validation */}
            <div className="form-control relative">
              <label htmlFor="content" className="label mb-1">
                <span className="label-text text-base-content font-medium">
                  Content
                </span>
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  className={`textarea h-64 w-full bg-base-200 focus:bg-base-100 transition-colors leading-relaxed ${
                    errors.content && "border-red-300"
                  }`}
                  placeholder="Write your blog post content here..."
                  value={formData.content}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors.content && (
                <label className="absolute left-0 label text-sm">
                  <span className="label-text-alt text-error">
                    {errors.content}
                  </span>
                </label>
              )}
            </div>

            {/* Submit Button with loading state */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary flex-1 sm:flex-none sm:px-8 ${
                  loading && "opacity-80 cursor-not-allowed "
                }`}
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
