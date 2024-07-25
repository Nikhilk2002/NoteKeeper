const express= require("express");
const { addNotes, getAllNotes, deleteNote } = require("../Controller/UserController");
const router = express.Router();


router.post('/addnotes',addNotes)

router.get('/allnotes',getAllNotes)
router.delete('/allnotes/:id',deleteNote);

module.exports = router;
