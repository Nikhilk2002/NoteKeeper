const express= require("express");
const { getAllNotes, deleteNote, editNote, Signup, Login,userStatus, addNote } = require("../Controller/UserController");
const router = express.Router();
const userAuth=require("../Middlewear/userAuth")

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/auth/status',userAuth,userStatus)

router.post('/addnotes',userAuth, addNote)

router.get('/allnotes',userAuth, getAllNotes)

router.delete('/allnotes/:id',userAuth, deleteNote);

router.put('/allnotes/:id',userAuth, editNote);

module.exports = router;
