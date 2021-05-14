const express = require('express');
const {Song} = require('../models/Song.js');
const router = express.Router();


// create a status object to hold numerical values of
// of response codes for better readability
const Status = {
  "OK": 200,
  "CREATED" : 201,
  "BAD_REQUEST" : 400,
  "NOT_FOUND": 404,
  "CONFLICT": 409
}


router.post('/', (req, res) => {
  Song.create(req.body, (err, _) => {               // attempt to create song
    if (err) res.status(Status.BAD_REQUEST).send(); // on error send 404
    else res.status(Status.CREATED).send();         // on success send 201
  });
});

router.get('/', (_, res) => {
  Song.find({}, (_, songs) => {   // get all song records from the database
    res.json(songs);              // return songs
  });
});


module.exports = router;
