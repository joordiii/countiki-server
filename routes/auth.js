'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');

const response = require('../helpers/response');
const User = require('../models/user').User;

router.post('/login', (req, res, next) => {
  console.log('Hello from backend');
  console.log(req.user);
  if (req.user) {
    return response.forbidden(req, res);
  }
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('errorcito');
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
  console.log(req.body);

  /* if (req.user) {
    return response.forbidden(req, res);
  } */
  const {
    organizationName,
    myAddress,
    myTelephone,
    myEmail,
    myWeb,
    username,
    password,
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
  if (!username) {
    return response.unprocessable(req, res, 'Missing mandatory field "Username".');
  }
  if (!password) {
    return response.unprocessable(req, res, 'Missing mandatory field "Password".');
  }
  if (!photo) {
    return response.unprocessable(req, res, 'Missing mandatory field "Photo".');
  }

  User.findOne({
    username: username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      organizationName,
      myAddress,
      myTelephone,
      myEmail,
      myWeb,
      username,
      password: hashPass,
      photo
    });

    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return response.data(req, res, newUser);
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
