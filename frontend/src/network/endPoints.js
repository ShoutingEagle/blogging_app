// backend

const baseUrl = "http://localhost:8000/api/v1"
const validateUser = "/auth/check-auth"
const sendOtp = "/auth/userAuth-generateOtp"
const remainingUserDetail = "/profile/user-detail"
const blogList = "/blog/blog-list"
const blogPost = "/blog/blog-post"
const blogDetailEndpoint = "/blog/blogId"

    // user-related
    const getUserDetail = "/profile/get-user-detail" 



// frontend

const login = "/userAuth/login"
const completeProfile = "/user/complete-profile"

export {baseUrl,validateUser,sendOtp,blogList,blogPost,remainingUserDetail,getUserDetail, blogDetailEndpoint}

export {login,completeProfile}