const express = require('express');
const path = require('path');

const app = express();

app.use('/sample_1', express.static(path.resolve(__dirname, '../sample_1/dist')));
app.use('/sample_2', express.static(path.resolve(__dirname, '../sample_2/dist')));

module.exports = app;
