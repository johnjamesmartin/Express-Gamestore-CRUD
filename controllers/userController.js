/* Dependencies
 *****************************************/
const User = require('../models/user');

// GET list of users
// Permission: public
// Description: Display a list of users
exports.user_list_get = (req, res, next) => {
  User.find()
    .sort([['username', 'ascending']])
    .exec((err, list_users) => {
      if (err) return next(err);
      res.render('user_list', {
        title: 'User List',
        user_list: list_users
      });
    });
};
