const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const response = require('../helpers/response');

/* GET home page. */
router.get('/', (req, res, next) => {
  response.data(req, res, { title: 'API' });
});

module.exports = router;

/* Upload. */
router.post('/upload', upload.single('file'), (req, res, next) => {
  res.json({ filename: `/uploads/${req.file.filename}` });
});
