import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-10 pb-6 px-6 md:px-16 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">Gaming<span className="text-white">Geeks</span></h2>
          <p className="text-sm leading-relaxed">
            Your one-stop destination for the latest gaming news, reviews, and blogs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><p className="hover:text-orange-400 transition cursor-pointer">Home</p></li>
            <li><p className="hover:text-orange-400 transition cursor-pointer">Blogs</p></li>
            <li><p className="hover:text-orange-400 transition cursor-pointer">About</p></li>
            <li><p className="hover:text-orange-400 transition cursor-pointer">Contact</p></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><p>Action</p></li>
            <li><p>RPG</p></li>
            <li><p>Multiplayer</p></li>
            <li><p>Simulation</p></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <span className="hover:text-blue-400 transition cursor-pointer">🌐</span>
            <span className="hover:text-blue-500 transition cursor-pointer">🐦</span>
            <span className="hover:text-pink-500 transition cursor-pointer">📸</span>
            <span className="hover:text-blue-700 transition cursor-pointer">📘</span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm mb-3">Get the latest news and reviews delivered to your inbox!</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-sm text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} GamingGeeks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

