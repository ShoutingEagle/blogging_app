// backend

const baseUrl = import.meta.env.VITE_API_URL ;

// const baseUrl = "http://localhost:8000/api/v1";  
const validateUser = "/auth/check-auth"
const logout = "/auth/logout"
const userRegister = "/auth/userAuth-auth"
const sendOtp = "/auth/userAuth-generateOtp"
const remainingUserDetail = "/profile/user-detail"


const blogList = "/blog/blog-list"
const blogPost = "/blog/blog-post"
const blogDetailEndpoint = "/blog/blogId"

const getBlogComments = "blog/get-comments"
const postBlogComment = "blog/post-comment"

// user-related
const getUserDetail = "/profile/get-user-detail" 


// frontend

const login = "/userAuth/login"
const completeProfile = "/user/complete-profile"

export {
    baseUrl,
    validateUser,
    userRegister,
    sendOtp,
    blogList,
    blogPost,
    remainingUserDetail,
    getUserDetail,
    logout,
    blogDetailEndpoint,
    getBlogComments,
    postBlogComment,
    login,
    completeProfile,
};