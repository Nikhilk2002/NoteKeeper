import React from 'react';
import backgroundImage from '../../Asset/note1.jpeg';

function Banner() {
  return (
    <div
      className="flex flex-col items-start justify-center h-screen w-full bg-cover bg-center mt-16 m-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-8 text-black bg-opacity-50 w-1/2">
        <p className="text-4xl font-semibold mb-4">
          "Save your thoughts, wherever you are"
        </p>
        <a 
          href="/addnotes"
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Notes
        </a>
      </div>
    </div>
  );
}

export default Banner;
