const express= require("express");
const { addNotes, getAllNotes } = require("../Controller/UserController");
const router = express.Router();


router.post('/addnotes',addNotes)

router.get('/allnotes',getAllNotes)

module.exports = router;
