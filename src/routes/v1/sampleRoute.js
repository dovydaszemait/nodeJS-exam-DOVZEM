const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json('sample route');
});

module.exports = router;
