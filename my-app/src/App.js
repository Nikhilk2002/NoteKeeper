import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import IndividualNote from './Pages/IndividualNote';
import DisplayAll from './Pages/DisplayAll';
import Addnotes from './Pages/Addnotes';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/individual' element={<IndividualNote/>} />
        <Route path='/allnotes' element={<DisplayAll/>} />
        <Route path='/addnotes' element={<Addnotes/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App