const express = require('express');
const Song = require('../models/Song.js');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'pjs' });
});

module.exports = router;
