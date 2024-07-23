const express = require('express');
const Note = require('../model/contentmodel');

module.exports.addNotes = async (req, res, next) => {
  const { title, content } = req.body;

  // Input validation
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    // Create a new note
    const newNote = new Note({
      title,
      content,
    });

    // Save the note to the database
    await newNote.save();

    // Send a success response
    res.status(201).json({ message: 'Note added successfully', note: newNote });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};
