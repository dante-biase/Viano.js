const express = require('express');
const Song = require('../models/Song.js');
const router = express.Router();

// /* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'pjs' });
// });

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

module.exports = router;
