import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../cssFiles/Navbar.css";
import { FaHome } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";



import asset3 from "../assets/asset3.png"
import asset4 from "../assets/asset4.png"
import asset5 from "../assets/asset5.png"
import asset6 from "../assets/asset6.png"


const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <div className="homeButton" onClick={() => navigate("/")}>
            <div className="homeIcon"><FaHome /></div>
            <div className="homeText">
                <span className="homePrimaryText">Gaming</span>
                <span className="homeSecondaryText">Geeks</span>
            </div>
        </div>

    );
};

const LoginButton = () => {
    const navigate = useNavigate();
    return (
        <div className="loginButton" onClick={() => navigate("/userAuth/login")}>
            <div className="loginIcon"><MdLogin /></div>
            <div className="loginText">
                <span className="loginPrimaryText">Login</span>
            </div>
        </div>
    );
};

const SignupButton = () => {
    const navigate = useNavigate();
    return (
        <div className="signupButton" onClick={() => navigate("/userAuth/signup")}>
            <div className="signupIcon"><FaUser /></div>
            <div className="signupText">
                <span className="signupPrimaryText">Signup</span>
            </div>
        </div>
    );
};



const SearchBar = () => {
    return (
        <div className="searchStripe">
            Search
            <div className="searchLogo">
                <input type="text" placeholder="Search for a blog" className="searchInput" />
                <IoSearchOutline />
            </div>
        </div>
    )
}



const Category = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryOffsets, setCategoryOffsets] = useState({});

    const categories = [
        { name: "View All", image: asset6, left: -5 },
        { name: "Gaming", image: asset5, left: -3.5 },
        { name: "PC", image: asset4, left: -2 },
        { name: "Console", image: asset3, left: -0.5 },
    ];

    function handleParentCategoryEnter() {
        setHoveredCategory("category");
    }

    function handleParentCategoryLeave() {
        setHoveredCategory(null);
        setCategoryOffsets({});
    }

    function handleSelectedCategoryEnter(category) {
        setHoveredCategory(category);

        let newOffsets = {};
        let flag = false;

        categories.forEach((item) => {
            if (item.name === category) flag = true;
            if (flag) newOffsets[item.name] = item.left + 7; // Adjust dynamically
        });

        setCategoryOffsets(newOffsets);
    }

    function handleSelectedCategoryLeave() {
        setHoveredCategory(null);
        setCategoryOffsets({});
    }

    return (
        <div className="categoryContainer">
            <div
                className="categoryStripe"
                onMouseEnter={handleParentCategoryEnter}
                onMouseLeave={handleParentCategoryLeave}
            >
                <div className="categoryText">
                    <span className="textcategoryStripe">Categories</span>
                    <span className="iconCategoryStripe"><FaArrowRight /></span>
                </div>
            </div>

            {categories.map((item, index) => (
                <div
                    className={`categoryStripe${item.name.replace(/\s+/g, "")}`}
                    key={index}
                    style={hoveredCategory ? { left: `${categoryOffsets[item.name] || item.left}rem` } : {}}
                    onMouseEnter={() => handleSelectedCategoryEnter(item.name)}
                    onMouseLeave={handleSelectedCategoryLeave}
                >
                    <span className="imageViewAll"><img src={item.image} alt={item.name} /></span>
                    <span className="textViewAll">{item.name}</span>
                </div>
            ))}
        </div>
    );
};


const Navbar = () => {
    return (
        <nav className="navbar">
            <HomeButton />
            <LoginButton />
            <SignupButton />
            <SearchBar />
            <Category />
        </nav>
    );
};

export default Navbar;
