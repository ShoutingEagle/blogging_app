import React from 'react';
import searchIcon from '../assets/search-icon.svg';

const SearchBar = ({ placeholder = "Search blogs...", value, onChange }) => {
  return (
    <div className="flex items-center bg-gray-100 w-full max-w-[60%] border border-gray-500 p-2 rounded">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent focus:outline-none text-gray-700 text-sm placeholder:text-gray-500 w-full"
      />
      <img src={searchIcon} alt="search icon" className="w-4" />
    </div>
  );
};

export default SearchBar;
