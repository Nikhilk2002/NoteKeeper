import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Allnote.css';
import { allnotes } from '../../Services/UserApi';

function AllNote() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

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

  const handleAddNote = () => {
    const newNote = { title: 'New Note', content: 'Content for new note' };
    navigate("/addnotes");
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
