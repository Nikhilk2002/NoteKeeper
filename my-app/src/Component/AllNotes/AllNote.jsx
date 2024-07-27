import React, { useState, useEffect } from 'react';
import { allnotes, deleteNote } from '../../Services/UserApi';

function AllNote() {
  const [notes, setNotes] = useState([]);
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await allnotes();
        console.log("Fetched notes:", response); 
        if (response && Array.isArray(response.notes)) {
          setNotes(response.notes);
        } else {
          console.error("Fetched notes data is not an array");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const toggleExpandNote = (index) => {
    setExpandedNoteIndex(expandedNoteIndex === index ? null : index);
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id)); // Remove note from state after successful delete
    } catch (error) {
      console.error("Error deleting note:", error.response ? error.response.data : error.message);
      alert("Failed to delete the note. Please try again.");
    }
  };
  
  
  const handleEdit = (id) => {
    // Implement edit logic here, e.g., open a modal or navigate to an edit page
    console.log('Edit note with id:', id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your All Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {notes.map((note, index) => (
  <div key={note.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
    <p className={`${expandedNoteIndex === index ? '' : 'truncate'} mb-2`}>
      {note.content}
    </p>
    <div className="flex justify-between items-center">
      <button
        onClick={() => toggleExpandNote(index)}
        className="text-blue-500 hover:underline"
      >
        {expandedNoteIndex === index ? 'Show less' : 'Read more'}
      </button>
      <div className="flex space-x-2">
        <button 
          onClick={() => handleEdit(note.id)}
          className="text-green-500 hover:text-green-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(note.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
}

export default AllNote;
