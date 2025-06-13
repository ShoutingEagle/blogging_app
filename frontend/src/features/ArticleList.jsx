import React, { useEffect } from "react";
import { FaEdit, FaCommentAlt, FaShareAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setProfilePic, setYourArticles } from "../slices/userDataSlice.js";
import { setGlobalError } from "../slices/errorSlice.js";
import apiClient from "../services/apiClient.js";
import { baseUrl, getUserDetail } from "../network/endPoints.js";

const ArticleList = () => {
    const { yourArticles } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (yourArticles.length === 0) {
            const fetchUserData = async () => {
                try {
                    const response = await apiClient({
                        method: "GET",
                        url: getUserDetail,
                        baseURL: baseUrl,
                        withCredentials: true,
                    });

                    if (!response || !response.success) {
                        dispatch(setGlobalError(response?.message || "Failed to fetch user data"));
                        return;
                    }

                    const { username, profile_pic } = response.data.userDetails;
                    dispatch(setUsername(username));
                    dispatch(setProfilePic(profile_pic));
                    dispatch(setYourArticles(response.data.blogs));
                } catch (error) {
                    dispatch(setGlobalError(error.message));
                }
            };

            fetchUserData();
        }
    }, [dispatch, yourArticles.length]);

    if (!yourArticles.length) {
        return (
            <div className="flex justify-center items-center py-10 text-gray-500">
                Loading or no articles found...
            </div>
        );
    }

    return (
    <div className="flex justify-center bg-gray-100 py-40 px-4">
    <div className=" max-w-6xl w-full space-y-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
            My Articles
        </h2>

        {yourArticles.map((article) => (
            <div
                key={article._id}
                className="w-full h-50 flex gap-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
            >
                {/* Image */}
                <div className="w-100 h-full">
                    <img
                        src={article.article_image}
                        alt={article.title}
                        className="w-full h-full object-cover rounded-l-xl"
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between w-full">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm uppercase bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                {article.category}
                            </span>
                            <span className="text-xs text-gray-400">
                                {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                            {article.title}
                        </h3>

                        <p className="text-sm text-gray-700 line-clamp-3 pr-2">
                            {article.article.replace(/\r\n/g, " ").substring(0, 250)}...
                        </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                            <FaCommentAlt className="text-base" />
                            <span>{article.comments || 0}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaEdit
                                className="hover:text-blue-600 cursor-pointer"
                                title="Edit"
                            />
                            <FaShareAlt
                                className="hover:text-green-600 cursor-pointer"
                                title="Share"
                            />
                            <FaTrash
                                className="hover:text-red-600 cursor-pointer"
                                title="Delete"
                            />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

    );
};

export default ArticleList;
