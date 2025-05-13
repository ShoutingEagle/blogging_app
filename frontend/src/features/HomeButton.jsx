import { useLocation, useNavigate} from "react-router-dom";
import "../cssFiles/HomeButton.css";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import home from "../network/endPoints.js";



const HomeButton = () => {
    const [path,setPath] = useState(null)
    const navigate = useNavigate();
    const {pathname} = useLocation()

    useEffect(() => {
        if(pathname === "/") setPath("icon-button")
        if(pathname === "/user/dashboard" || pathname.includes("/blog")) setPath("home-button")
    },[pathname])
   
    return (
        <>
        {
        path ?
        <div onClick={() => navigate(home)} className={path}>
            <div className="homeIcon"><FaHome /></div>
            <div className="homeText">
                <span className="homePrimaryText">Gaming</span>
                <span className="homeSecondaryText">Geeks</span>
            </div>
        </div> : null
        }
        </>
    );
};

export default HomeButton