import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { userStatus } from '../../Services/UserApi';

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchData = async () => {
    try {
      const { user } = await userStatus();
      setLoggedIn(!!user);
    } catch (error) {
      console.log("Error fetching status:", error);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('JWT'); 
    setLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <nav className="flex justify-between items-center fixed top-0 left-0 right-0 p-4 bg-gray-800 text-white z-50">
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
        {loggedIn ? (
          <li>
            <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
