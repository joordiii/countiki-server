'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');

const response = require('../helpers/response');
const User = require('../models/user').User;

router.post('/login', (req, res, next) => {
  if (req.user) {
    return response.forbidden();
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return response.notFound(req, res);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return response.data(req, res, req.user);
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  if (req.user) {
    return response.forbidden();
  }
  const {
    organizationName,
    myAddress,
    myTelephone,
    myEmail,
    myWeb,
    myUsername,
    myPassword,
    photo
  } = req.body;

  if (!organizationName) {
    return response.unprocessable(req, res, 'Missing mandatory field "Organization Name".');
  }
  if (!myAddress) {
    return response.unprocessable(req, res, 'Missing mandatory field "Address".');
  }
  if (!myTelephone) {
    return response.unprocessable(req, res, 'Missing mandatory field "Telephone".');
  }
  if (!myEmail) {
    return response.unprocessable(req, res, 'Missing mandatory field "Email".');
  }
  if (!myWeb) {
    return response.unprocessable(req, res, 'Missing mandatory field "Website".');
  }
  if (!myUsername) {
    return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  }
  if (!myPassword) {
    return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  }
  if (!photo) {
    return response.unprocessable(req, res, 'Missing mandatory field "Photo".');
  }

  User.findOne({
    myUsername
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(myPassword, salt);

    const newUser = User({
      myUsername,
      myEmail,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return response.data(req, res, newUser.asData());
      });
    });
  });
});

router.post('/logout', (req, res) => {
  req.logout();
  return response.ok(req, res);
});

router.get('/me', (req, res) => {
  if (req.user) {
    return response.data(req, res, req.user.asData());
  }

  return response.notFound(req, res);
});

module.exports = router;
