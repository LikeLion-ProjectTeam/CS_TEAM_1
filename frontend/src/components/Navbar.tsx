import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gray-400 rounded-full" />
    <span className="font-bold text-lg text-gray-700">Disable Helper</span>
  </div>

  <ul className="flex space-x-6 items-center">
    <li className="hover:underline cursor-pointer text-gray-700">Home</li>
    <li className="hover:underline cursor-pointer text-gray-700">Menu</li>
    <li className="hover:underline cursor-pointer text-gray-700">About Us</li>
    <li>
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </li>
  </ul>
</nav>

  );
};

export default Navbar;
