'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  organizationName: {
    type: String
  },
  myAddress: {
    type: String
  },
  myTelephone: {
    type: String
  },
  myEmail: {
    type: String
  },
  myWeb: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  photo: {
    type: String
  }/* ,
  photo: {
    pic_path: String,
    pic_name: String
  } */
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
