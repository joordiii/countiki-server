'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({

  slogan: {
    type: String
    },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  location: {
    latitude: String,
    longitude: String
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
  attendance : [{
    lat : String,
    lng : String
     }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = {
  Event
};