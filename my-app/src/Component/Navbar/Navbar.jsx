import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 right-0 p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <Link to="/">Note Keeper</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/addnotes" className="hover:text-gray-400">Add Note</Link>
        </li>
        <li>
          <Link to="/allnotes" className="hover:text-gray-400">Read Note</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-400">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
