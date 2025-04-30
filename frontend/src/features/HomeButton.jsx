import { useNavigate } from "react-router-dom";
import "../cssFiles/Navbar.css";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";



const HomeButton = () => {
    const status = useSelector(state => state.status.userStatus)
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/")} className="home-button">
            <div className="homeIcon"><FaHome /></div>
            <div className="homeText">
                <span className="homePrimaryText">Gaming</span>
                <span className="homeSecondaryText">Geeks</span>
            </div>
        </div>

    );
};

export default HomeButton