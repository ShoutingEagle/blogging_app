import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from "../assets/icon.svg"
import searchIcon from "../assets/search-icon.svg"
import nav from "../assets/nav.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { sidebarToggle } from '../slices/systemSlice.js';

const Navbar = () => {
  const dispatch = useDispatch()
  const isSideBarOpen = useSelector(state => state.system.isSideBarOpen)
  const {username, profilePic} = useSelector(state => state.userData)
  const [width,setWidth] = useState(window.innerWidth)

  useEffect(() => { 
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize',handleResize)
    return () => window.removeEventListener('resize',handleResize)
  },[width])

  return (
    <nav className='h-[5rem] overflow-hidden text-white text-lg md:text-xl fixed top-0 w-full z-60 bg-gray-100 shadow-lg fixed'>
      <img src={nav} alt='img' className='absolute'/>
      <div className="h-full mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 font-bold relative ">
          <span className='-rotate-30 w-25 md:w-30 absolute'><img src={icon} alt='img' className=''/></span>
          <Link to={'/'} className='z-10'>
            <span className=''>Gaming</span>
            <span className='text-black'>Geeks</span>
          </Link>
        </div>



        {/* Right Side - Profile / Login */}
        <div className="flex justify-end items-center gap-8 w-[50%]">
          {/* <div className="flex items-center bg-gray-100 w-[60%] border border-gray-500 p-2">
              <input
              type="text"
              placeholder="Search blogs..."
              className="bg-transparent focus:outline-none text-gray-700 text-sm placeholder:text-gray-500 w-full"
              />
              <img src={searchIcon} alt="search icon" className="w-4 " />
          </div> */}

          {/* profile pic */}
          {width > 480 && (
            <div className="flex items-center gap-1 text-sm font-semibold text-white p-2">
              <span className="w-10 h-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-black/50">
                <img src={profilePic} className="w-full h-full object-cover" alt="Profile" />
              </span>
            </div>
          )}



          {/* Hamburger */}
          <div className="cursor-pointer">
            <button onClick={() => dispatch(sidebarToggle())} className="focus:outline-none ">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isSideBarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

