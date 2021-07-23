const express = require('express');
const router = require('./notesRouter');
const app = express();
app.use('/notes', router);

module.exports = app;