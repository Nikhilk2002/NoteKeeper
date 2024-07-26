import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import IndividualNote from './Pages/IndividualNote';
import DisplayAll from './Pages/DisplayAll';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/individual' element={<IndividualNote/>} />
        <Route path='/allnotes' element={<DisplayAll/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App