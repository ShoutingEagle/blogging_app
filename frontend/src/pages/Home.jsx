import React from "react";
import "../cssFiles/Home.css"
import Navbar from "../features/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Home;
