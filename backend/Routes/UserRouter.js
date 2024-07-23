const express= require("express");
const { addNotes } = require("../Controller/UserController");
const router = express.Router();


router.post('/addnotes',addNotes)


module.exports = router;
