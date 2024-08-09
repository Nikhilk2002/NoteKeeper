import React from 'react'
import Addnote from '../Component/AddNotes/Addnote'
import Allnote from '../Component/AllNotes/AllNote'
import backgroundImage from '../Asset/backround3.jpeg'; 
import Navbar from '../Component/Navbar/Navbar';


function Addnotes() {
  return (
    <div
    className="min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="bg-white bg-opacity-75 p-9">

        <Navbar/>
        <Addnote/>
        <Allnote/>
        
    </div>
    </div>
  )
}

export default Addnotes