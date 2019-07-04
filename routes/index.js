/* Dependencies
 *****************************************/
const express = require('express');
const router = express.Router();

/* Routes
 *****************************************/
// GET homepage — public route
router.get('/', (req, res) => {
  res.redirect('/catalog');
});

module.exports = router;
