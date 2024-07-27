import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 reletive bottom-0 left-0 right-0 w-100%">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Note Keeper. All rights reserved.</p>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/about" className="hover:text-gray-400">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
