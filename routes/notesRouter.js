const express = require('express');
const router = express.Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

router.get('/', (req, res) => {
    console.info(`${req.method} request received for tips`);
    readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
  });

router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
  
    const { username, topic, tip } = req.body;
  
    if (req.body) {
      const newTip = {
        username,
        tip,
        topic,
        tip_id: uuid(),
      };
  
      readAndAppend(newTip, './db/tips.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
});

module.exports = router;