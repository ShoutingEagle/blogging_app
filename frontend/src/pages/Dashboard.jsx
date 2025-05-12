import React, { useEffect,useState} from "react";
import "../cssFiles/Dashboard.css"
import setting from "../assets/asset-setting.svg"
import writeBlog from "../assets/asset-write-blog.svg"
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";



import apiClient from "../services/apiClient.js";
import { baseUrl,getUserDetail,validateUser } from "../network/endPoints.js";
import { login } from "../network/endPoints.js";
import { checkAuthStatus } from "../slices/authSlice.js";
import PopUpMessage from "../components/PopUpMessage.jsx";
import { setBlogLists } from "../slices/blogSlice.js";
import Logout from "../components/Logout.jsx";


function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData,setUserData] = useState(null) 
    const [blogsData,setBlogsData] = useState(null) 


    useEffect(() => {
        const fetchAuthStatus = async () => {
            const response = await apiClient({
                method: "GET",
                url: validateUser,
                baseURL: baseUrl,  
                withCredentials: true
            })
            response.success? dispatch(checkAuthStatus(true)): navigate(login);
            if(response.success){
                const userDetail = await apiClient({
                    method: "GET",
                    url: getUserDetail,
                    baseURL: baseUrl,
                    withCredentials: true
                })
                if(userDetail.success){
                    setUserData(userDetail.data.userDetails)
                    setBlogsData(userDetail.data.blogs)
                    dispatch(setBlogLists(userDetail.data.blogs))
                }
            }
        };
        fetchAuthStatus();
    }, []);
    

    function handleClick(e, link) {
        navigate(`${link}`)
    }

    return (
        <div className="dashboard">
            <PopUpMessage />
            <Logout/>
            <div className="dashboard-section">
                <div className="dashboard-header" onClick={(e) => handleClick(e, "profile")}>
                    {/* <img src=""/> */}
                    <div className="dashboard-header-user">
                        <p className="dashboard-header-username">{userData?userData.username:null}</p>
                        <div className="dashboard-header-user-container">
                            {userData?
                            <img src={userData?.profile_pic} className="dashboard-header-user-img"/>:null
                            }
                        </div>
                    </div>
                </div>

                
                <div className="dashboard-write-blog-setting">
                    <div className="dashboard-write-blog" onClick={(e) => handleClick(e, "write-blog")}>
                        <img src={writeBlog} alt="img" />
                        <p>Write new Article</p>
                    </div>


                    <div className="dashboard-blogs-setting" onClick={(e) => handleClick(e, "setting")}>
                        <img src={setting} alt="img" />
                        <p>Settings</p>
                    </div>
                </div>


                <div className="dashboard-blogs-marked-articles" >
                    <p className="dashboard-blogs-marked-articles-header">Marked Articles</p>
                    <div className="dashboard-blogs-marked-articles-list">
                            No list to show
                    </div>
                </div>


                <div className="dashboard-blogs-your-articles">
                    <p className="dashboard-blogs-your-articles-header">Your Articles</p>
                    <div className="user-blogs-list-container">
                        {blogsData?
                            blogsData.map((item,index) => {
                                return (
                                    <p className="user-blogs-list" key={item._id}> {item.title}</p>
                            )})
                            : <p>No list to show</p>
                        }
                    </div>
                    <div className="see-all-container">
                        <span 
                            className="see-all" 
                            onClick={(e) => handleClick(e,"article-list")}
                        >
                            See All
                        </span>
                    </div>
                </div>
            </div>


            {(userData && blogsData) ? (
            <div className="dashboard-outlet">
                <Outlet />
                </div>
                ) : (
                    <div className="dashboard-outlet">
                        <p>Loading...</p>
                    </div>
                )}

            </div>
        
    );
}

export default Dashboard;
