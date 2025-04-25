import React from 'react';

type NavbarProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({ setSearch }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="font-bold text-gray-700">Disability Helper</span>
      </div>

      <ul className="flex space-x-6 items-center">
        <li><a href="/" className="hover:underline text-gray-700">Home</a></li>
        <li><a href="/menu" className="hover:underline text-gray-700">Menu</a></li>
        <li><a href="/about" className="hover:underline text-gray-700">About Us</a></li>
      </ul>

      <input
        type="text"
        placeholder="Search"
        className="border px-2 py-1 rounded text-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
};

export default Navbar;
