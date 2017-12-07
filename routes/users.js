var express = require('express');
var router = express.Router();

const response = require('../helpers/response');
/* GET users listing. */
router.get('/', (req, res, next) => {
  response.data(req, res, 'todo!');
});

module.exports = router;
