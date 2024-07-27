import React from 'react';
import chartImage from '../../Asset/chart.jpeg'; 

function Banner2() {
  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-normal text-slate-500 mb-4">Capture what’s on your mind</h1>
      <img src={chartImage} alt="Centered" className="w-1/2 h-auto mt-9" />
    </div>
  );
}

export default Banner2;
