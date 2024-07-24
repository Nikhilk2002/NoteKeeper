const express = require('express');
const Note = require('../model/contentmodel');

module.exports.addNotes = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const newNote = new Note({
      title,
      content,
    });

    await newNote.save();

    res.status(201).json({ message: 'Note added successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};



module.exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();

    res.status(200).json({ message: 'Notes fetched successfully', notes });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};