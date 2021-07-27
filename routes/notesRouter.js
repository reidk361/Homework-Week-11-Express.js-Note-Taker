const router =  require('express').Router();
const { readFromFile, readAndOverwrite, readAndAppend, } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');
const notes = require('../db/db.json');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  if (req.body && noteId) {
    console.info(`${req.method} request received for note ${noteId}.`);
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i];
      if (currentNote.note_id === noteId) {
        res.json(currentNote);
        return;
      }
    }
    res.json('Note ID not found');
  }
});

router.delete('/:note_id', (req, res, next) => {
  const noteId = req.params.note_id;
  console.info(`${req.method} request received for note id ${noteId}.`);
  for (let i = 0; i < notes.length; i++) {
    const currentNote = notes[i];
    if (currentNote.note_id === noteId) {
      res.json(`${currentNote.title} has been deleted`);
      notes.splice(i, 1);
      console.log(notes);
      readAndOverwrite(notes, './db/db.json');
      return;
    }
  }
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