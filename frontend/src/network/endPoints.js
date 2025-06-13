// backend

const baseUrl = import.meta.env.VITE_API_URL ;


const validateUser = "/auth/check-auth"
const logout = "/auth/logout"
const userRegister = "/auth/userAuth-auth"
const authUser = "/auth/auth-user"
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
const home = "/"
const login = "/userAuth/login"
const completeProfile = "/user/complete-profile"
const writeArticle = "/write-article"
const yourArticleList = "/your-articles"

export {
    baseUrl,
    validateUser,
    userRegister,
    authUser,
    sendOtp,
    blogList,
    blogPost,
    remainingUserDetail,
    getUserDetail,
    logout,
    blogDetailEndpoint,
    getBlogComments,
    postBlogComment,
    home,
    login,
    completeProfile,
    writeArticle,
    yourArticleList
};