'use client';
import React from 'react';
import Link from 'next/link';

type NavbarProps = {
  setSearch: (value: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ setSearch }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-400 rounded-full" />
        <span className="font-bold text-lg text-gray-700">Disable Helper</span>
      </div>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link href="/" className="hover:underline text-gray-700">Home</Link>
        </li>
        <li>
          <Link href="/menu" className="hover:underline text-gray-700">Menu</Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline text-gray-700">About Us</Link>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-full"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
