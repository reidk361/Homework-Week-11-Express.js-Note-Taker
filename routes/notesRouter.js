const express = require('express');
const router = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, note } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        date: getDate(),
        note,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully.`);
    } else {
      res.error('Error in adding note. Please try again.');
    }
});

module.exports = router;