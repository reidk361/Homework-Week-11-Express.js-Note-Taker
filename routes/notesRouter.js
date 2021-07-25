const router =  require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note.`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        date: getDate(),
        text,
        note_id: uuid(),
      };
      readAndAppend(newNote, './db/db.json');
      
      res.json(`Note added successfully. ID: ${newNote.note_id}`);
    } else {
      res.error('Error in adding note. Please try again.');
    }
});

module.exports = router;