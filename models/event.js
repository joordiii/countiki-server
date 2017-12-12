'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({

  slogan: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  description: {
    type: String
  },
  /*  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }, */
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attendance: [{
    lat: Number,
    lng: Number
  }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = {
  Event
};
