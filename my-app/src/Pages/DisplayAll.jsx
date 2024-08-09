import React from 'react';
import AllNote from '../Component/AllNotes/AllNote';
import backgroundImage from '../Asset/backround3.jpeg'; 
import Navbar from '../Component/Navbar/Navbar';

function DisplayAll() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-75 p-14">
        <Navbar/>
        <AllNote />
      </div>
    </div>
  );
}

export default DisplayAll;
