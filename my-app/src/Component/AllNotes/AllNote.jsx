import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Allnote.css';

function AllNote() {
  const [notes, setNotes] = useState([
    { title: 'Note 1', content: 'Content for note 1' },
    { title: 'Note 2', content: 'Content for note 2' }
  ]);
  const navigate = useNavigate();

  const handleAddNote = () => {
    const newNote = { title: 'New Note', content: 'Content for new note' };
    navigate("/"); 
    setNotes([...notes, newNote]);
  };

  return (
    <div className="note-container">
        <h1>Your All Notes</h1>
      <button className="add-button" onClick={handleAddNote}>+</button>
      {notes.map((note, index) => (
        <div key={index} className="note">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AllNote;
