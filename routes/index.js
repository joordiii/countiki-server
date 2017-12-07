const express = require('express');
const router = express.Router();

const response = require('../helpers/response');

/* GET home page. */
router.get('/', (req, res, next) => {
  response.data(req, res, { title: 'API' });
});

module.exports = router;
