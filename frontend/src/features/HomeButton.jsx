import { useLocation, useNavigate } from "react-router-dom";
import "../cssFiles/HomeButton.css";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { home } from "../network/endPoints.js";

const HomeButton = () => {
  const [buttonType, setButtonType] = useState(null); // "icon-button" or "home-button"
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Show button only on "/", "/user/dashboard", or "/blog/*"
    if (pathname === "/") {
      setButtonType("icon-button"); // non-clickable
    } else if (
      pathname === "/user/dashboard" ||
      pathname.includes("/blog")
    ) {
      setButtonType("home-button"); // clickable
    } else {
      setButtonType(null); // hide on all other pages
    }
  }, [pathname]);

  if (!buttonType) return null;

  const isClickable = buttonType === "home-button";

  return (
    <div
      onClick={isClickable ? () => navigate(home) : undefined}
      className={`home-button-default ${buttonType}`}
    >
      <div className="homeIcon">
        <FaHome />
      </div>
      <div className="homeText">
        <span className="homePrimaryText">Gaming</span>
        <span className="homeSecondaryText">Geeks</span>
      </div>
    </div>
  );
};

export default HomeButton;
