const fs = require('fs');
const util = require('util');
const express = require('express');
const uuid = require('./helpers/uuid');
const app = express();
const path = require('path');
const { router } = require('./routes');

const PORT = 8080;

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

app.use('/api/notes', router);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);