'use strict';

var express = require('express');
var router = express.Router();

const Event = require('../models/event').Event;

/* GET Events listing. */
router.get('/', (req, res, next) => {
    Event.find((err, eventList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(eventList);
  });
});

/* CREATE a new Event. */
router.post('/', (req, res, next) => {
    const newEvent = new Event({
      slogan: req.body.slogan,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description
    });
  
    newEvent.save((err) => {
      if (err) {
        res.json(err);
        return;
      }
  
      res.json({
        message: 'New Event created!',
        id: newEvent._id
      });
    });
  });

module.exports = router;