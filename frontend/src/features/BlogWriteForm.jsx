import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../services/apiClient.js";
import { baseUrl, blogPost, getUserDetail } from "../network/endPoints.js";
import { setUsername, setProfilePic } from "../slices/userDataSlice.js";
import { setGlobalError } from "../slices/errorSlice.js";

const BlogWriteForm = () => {
  const {username,profilePic} = useSelector(state => state.userData)
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if(!username){
      const userData = async() => {
          try {
              const response = await apiClient({
                  method: "GET",
                  url: getUserDetail,
                  baseURL: baseUrl,
                  withCredentials: true
              })
              if(!response) dispatch(setGlobalError(response.message))
              const {username,profile_pic} = response.data.userDetails
              dispatch(setUsername(username))
              dispatch(setProfilePic(profile_pic))


          } catch (error) {
              dispatch(setGlobalError(error.message))
          }
      }
      userData()

    }
  },[dispatch,username])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = formRef.current;
    const formData = new FormData(form);
    try {
      const response = await apiClient({
        method: "POST",
        url: blogPost,
        baseURL: baseUrl,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.success) {
        form.reset();
        setImagePreview(null);
        return
      }
    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inset-0 flex flex-col items-center justify-center bg-gray-100 p-40">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold">Write a New Article</h2>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl w-full mx-auto bg-white rounded-md shadow-xl p-8 space-y-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800">📝 Article Details</h2>

        {/* Title + Category */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Title */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Select a category</option>
              <option value="gaming">Gaming</option>
              <option value="pc">PC</option>
              <option value="consoles">Consoles</option>
            </select>
          </div>
        </div>

        {/* Featured Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Featured Image
          </label>

          {imagePreview ? (
            <div className="relative w-full h-44 border border-gray-300 rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="file-upload"
                className="absolute bottom-2 right-2 bg-white text-gray-700 text-xs px-3 py-1 rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-100 transition"
              >
                Change Image
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-700 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V4m0 0L3 8m4-4l4 4M17 16v-8m0 0l-4 4m4-4l4 4"
                    />
                  </svg>
                  <p className="mb-1 text-sm text-gray-600">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG (max. 5MB)</p>
                </div>
              </label>
            </div>
          )}

          <input
            id="file-upload"
            type="file"
            name="file"
            required
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        

        {/* Initial Thoughts */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Initial Thoughts
          </label>
          <input
            type="text"
            name="initialThoughts"
            placeholder="What is your initial thought..."
            required
            className="w-full px-4 py-2 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>


        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Rating (out of 5)
          </label>
          <input
            type="number"
            name="rating"
            placeholder="4"
            step="0.1"
            min="1"
            max="5"
            required
            className="w-24 text-center px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
          <p className="text-xs text-gray-500 mt-1">Give a rating between 1.0 and 5.0 (e.g., 4.5)</p>
        </div>


        {/* Article Content */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Content
          </label>
          <textarea
            name="article"
            placeholder="Write your blog content here..."
            required
            className="w-full h-100 px-4 py-2 resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Submit Button */}
        <div>
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black flex justify-center items-center text-white font-semibold py-3 rounded-md hover:bg-gray-900 transition disabled:opacity-60 cursor-pointer"
            >
                {!isLoading ? (
                <span className="text-white tracking-wide">Post Article</span>
                ) : (
                <div className="flex items-center gap-2">
                    <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                    </svg>
                    <span>Posting...</span>
                </div>
                )}
            </button>
        </div>

      </form>
    </div>
  );
};

export default BlogWriteForm;
