'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const response = require('../helpers/response');
const Event = require('../models/event').Event;

/* GET Events listing. ---------------------------- */
router.get('/', (req, res, next) => {
  Event.find({}, (err, eventList) => {
    if (err) {
      next(err);
    } else {
      response.data(req, res, eventList);
    }
  });
});

/* GET a single Event. ---------------------------- */
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    response.unprocessable(req, res, 'Specified id is not valid');
    return;
  }

  Event.findById(req.params.id, (err, theEvent) => {
    if (err) {
      next(err);
    } else if (!theEvent) {
      response.notFound(req, res);
    } else {
      response.data(req, res, theEvent);
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
      next(err);
    } else {
      response.data(req, res, {
        message: 'New Event created!',
        id: newEvent._id
      });
    }
  });
});

/* DELETE an Event. --------------------------------- */
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    response.unprocessable(req, res, 'Specified id is not valid');
    return;
  }

  Event.remove({ _id: req.params.id }, (err, next) => {
    if (err) {
      next(err);
    } else {
      return response.data(req, res, {
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
      next(err);
    } else {
      response.data(req, res, {
        message: 'New Event created!',
        id: attendEvent._id
      });
    }
  });
});

module.exports = router;
