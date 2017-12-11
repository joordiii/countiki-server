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

/* GET events of defined User */
router.get('/user-events', (req, res, next) => {
  Event.find({_id: req.user._id}, (err, eventList) => {
    if (err) {
      next(err);
    } else {
      response.data(req, res, eventList);
    }
  });
});

/* GET a single Event. ---------------------------- */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.unprocessable(req, res, 'Specified id is not valid');
    return;
  }
  console.log('-------', id);
  Event.findById(id).populate('user_id').exec((err, theEvent) => {
    if (err) {
      next(err);
    } else if (!theEvent) {
      response.notFound(req, res);
    } else {
      console.log('chocolate');
      console.log('The event', theEvent.user_id);
      response.data(req, res, theEvent);
    }
  });
});

/* CREATE a new Event. ---------------------------- */
router.post('/', (req, res, next) => {
  console.log('user', req.user);
  const newEvent = new Event({
    slogan: req.body.slogan,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    description: req.body.description,
    user_id: req.user._id
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
