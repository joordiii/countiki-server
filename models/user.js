'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  telf: {
    type: String
  },
  email: {
    type: String
  },
  website: {
    type: String
  },
  photo: {
    pic_path: String,
    pic_name: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
