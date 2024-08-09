import React, { useState, useEffect } from 'react';
import { getAllNotes, deleteNote, editNote } from '../../Services/UserApi';

function AllNote() {
  const [notes, setNotes] = useState([]);
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  const [editMode, setEditMode] = useState({ index: null, title: '', content: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        console.log("Fetched notes:", response);
        if (Array.isArray(response)) {
          setNotes(response);
        } else {
          console.error("Fetched notes data is not an array");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [notes]); 

  const toggleExpandNote = (index) => {
    setExpandedNoteIndex(expandedNoteIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.response ? error.response.data : error.message);
      alert("Failed to delete the note. Please try again.");
    }
  };

  const handleEdit = (index) => {
    setEditMode({
      index,
      title: notes[index].title,
      content: notes[index].content,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    const { index, title, content } = editMode;
    const id = notes[index]._id;
    try {
      const updatedNote = { title, content };
      const response = await editNote(id, updatedNote);
      console.log("Updated note response:", response);
      const updatedNotes = [...notes];
      updatedNotes[index] = response.note;
      setNotes(updatedNotes);
      setEditMode({ index: null, title: '', content: '' });
    } catch (error) {
      console.error("Error editing note:", error.response ? error.response.data : error.message);
      alert("Failed to edit the note. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen relative">
      <h1 className="text-2xl font-serif font-gray mb-4 text-center text-black font-bold">All Your Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div
            key={note._id}
            onClick={() => toggleExpandNote(index)}
            className={`relative bg-stone-50 text-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300 ${
              expandedNoteIndex === index ? 'z-10 bg-blue-50' : ''
            }`}
            style={{
              transform: expandedNoteIndex === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s',
            }}
          >
            {editMode.index === index ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editMode.title}
                  onChange={handleEditChange}
                  className="block w-full mb-2 border border-gray-300 rounded p-2"
                />
                <textarea
                  name="content"
                  value={editMode.content}
                  onChange={handleEditChange}
                  className="block w-full mb-2 border border-gray-300 rounded p-2"
                />
                <button
                  onClick={handleEditSubmit}
                  className="text-blue-500 hover:underline"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2 className={`text-xl font-semibold mb-2 text-center ${
                  expandedNoteIndex === index ? 'bg-yellow-200 p-2 rounded text-black text-center' : ''
                }`}>{note.title}</h2>
                <p className={`${expandedNoteIndex === index ? '' : 'truncate'} mb-2`}>
                  {note.content}
                </p>
                {expandedNoteIndex === index && (
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(index);
                        }}
                        className="text-green-500 hover:text-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(note._id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllNote;
