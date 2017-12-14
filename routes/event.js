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
  console.log('aqui estamos', req.user);
  Event.find({user_id: req.user._id}, (err, eventList) => {
    if (err) {
      return next(err);
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
  console.log('req.body', req.body);
  const newEvent = new Event({
    slogan: req.body.eventForm.slogan,
    startDate: req.body.eventForm.startDate,
    endDate: req.body.eventForm.endDate,
    location: {
      type: 'Point',
      coordinates: [req.body.eventForm.location.longitude, req.body.eventForm.location.latitude]
    },
    description: req.body.eventForm.description,
    address: req.body.eventForm.address,
    user_id: req.body.user._id
  });
  console.log('req body', req.body);

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

/* Add a new attendee at the Event */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  // Find the existing resource by ID
  Event.findById(id, (err, event) => {
    if (err) {
      res.status(500).json(err);
    } else {
      event.attendance.push(req.body.location);
      /* event.slogan;
      event.slogan;
      event.endDate;
      event.location;
      event.description;
      event.ser_id; */

      // Save the updated document back to the database
      event.save((err, todo) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(event);
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
