/* Dependencies
 *****************************************/
const express = require('express');
const router = express.Router();

/* Routes
 *****************************************/
// GET homepage — public route
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
