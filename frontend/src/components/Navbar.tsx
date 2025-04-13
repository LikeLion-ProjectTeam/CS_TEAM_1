"use client";
import React from 'react';
import Link from 'next/link';

const Navbar = ({ setSearch }: { setSearch: (value: string) => void }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-bold text-gray-700">Helper</span>
        </div>      
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
      </ul>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded-full"
      />
    </nav>
  );
};

export default Navbar;

