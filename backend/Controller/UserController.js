const express = require('express');
const Note = require('../model/contentmodel');
const mongoose = require('mongoose');
const User=require('../model/usermodel')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const maxAge = 3 * 24 * 60 * 60;



const createToken = (userId) => {
  return jwt.sign({ userId }, 'JWT', { expiresIn: maxAge });
};

module.exports.Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = createToken(user._id);

    res.status(201).json({ user: { id: user._id, name, email }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    res.status(200).json({ user: { id: user._id, name: user.name, email }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const note = new Note({
      title,
      content,
      user: req.user._id
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    next(error);
  }
};


module.exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteNote = async (req, res, next) => {
  const noteId = req.params.id;

  if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: 'Invalid note ID' });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};



module.exports.editNote = async (req, res, next) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  if (!noteId || !mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ message: 'Invalid note ID' });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
    next(error);
  }
};

module.exports.userStatus = async (req, res) => {
  try {
    const user = req.user;
    console.log(user)
    if (user) {
      res.json({ user })
    } else {
      res.json({ user: null })
    }
  } catch (error) {
    console.log(error);
  }
};