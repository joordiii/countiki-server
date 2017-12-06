'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Event = require('../models/event').Event;

/* GET Events listing. ---------------------------- */
router.get('/', (req, res, next) => {
  Event.find({}, (err, eventList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(eventList);
  });
});

/* GET a single Event. ---------------------------- */
router.get('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.findById(req.params.id, (err, theEvent) => {
    if (err) {
      res.json(err);
    } else {
      res.json(theEvent);
    }
  });
});

/* CREATE a new Event. ---------------------------- */
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

/* DELETE an Event. --------------------------------- */
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Event.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
    } else {
      return res.json({
        message: 'Event has been removed!'
      });
    }
  });
});

/* Attend an Event. ------------------------------------ */
router.post('/:id/attend', (req, res, next) => {
  const attendEvent = new Event({
    /* slogan: req.body.slogan,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    description: req.body.description */
  });

  attendEvent.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Event created!',
      id: attendEvent._id
    });
  });
});

module.exports = router;
