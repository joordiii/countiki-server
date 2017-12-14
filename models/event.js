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
    type: {
      type: String
    },
    coordinates: [Number]
  },
  description: {
    type: String
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attendance: [{
    lat: Number,
    lng: Number
  }],
  address: {
    type: String
  }
});

eventSchema.index({ location: '2dsphere' });

const Event = mongoose.model('Event', eventSchema);
module.exports = {
  Event
};
