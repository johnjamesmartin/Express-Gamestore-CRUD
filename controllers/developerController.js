/* Dependencies
 *****************************************/
const Developer = require('../models/developer');

// GET list of developers
// Permission: public
// Description: Display a list of developers
exports.developer_list = (req, res, next) => {
  Developer.find()
    .sort([['name', 'ascending']])
    .exec((err, list_developers) => {
      if (err) return next(err);
      res.render('developer_list', {
        title: 'Developer List',
        developer_list: list_developers
      });
    });
};

// GET details of a developer
// Permission: public
// Description: Display details of a developer
exports.developer_detail = (req, res, next) => {
  Developer.findById(req.params.id)
    .populate('developer')
    .exec((err, detail_developer) => {
      if (err) return next(err);
      res.render('developer_detail', {
        title: 'Developer Detail',
        developer_detail: detail_developer
      });
    });
};

// GET page for creating a developer
// Permission: private (users only)
// Description: Display create developer form
exports.developer_create_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    res.render('developer_create', {
      title: 'Create developer'
    });
  } else {
    res.render('permission_denied');
  }
};

// POST page for creating a developer
// Permission: private (users only)
// Description: Post create developer form
exports.developer_create_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    const developer = new Developer({
      name: req.body.name
    });
    developer.save(err =>
      err ? console.error(err) : console.log('Successfully created developer')
    );
    res.redirect('/catalog/developers');
  } else {
    res.render('permission_denied');
  }
};

// GET page for deleting a developer
// Permission: private (admin only)
// Description: Display delete developer form
exports.developer_delete_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Developer.findById(req.params.id)
      .populate('developer')
      .exec((err, delete_developer) => {
        if (err) return next(err);
        res.render('developer_delete', {
          title: 'Delete Developer',
          developer_delete: delete_developer
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for deleting a developer
// Permission: private (admin only)
// Description: Display delete developer form
exports.developer_delete_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Developer.remove({ _id: req.params.id }, err => {
      err
        ? console.error('Error deleting developer')
        : console.log('Successfully deleted developer');
      res.redirect('/catalog/developers');
    });
  } else {
    res.render('permission_denied');
  }
};

// GET page for updating a developer
// Permission: private (admin only)
// Description: Display update developer form
exports.developer_update_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Developer.findById(req.params.id)
      .populate('developer')
      .exec((err, detail_developer) => {
        if (err) return next(err);
        res.render('developer_update', {
          title: 'Update developer',
          detail_developer
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for updating a developer
// Permission: private (admin only)
// Description: Post update developer form
exports.developer_update_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    const obj = {
      name: req.body.name
    };
    Developer.findByIdAndUpdate(
      req.params.id,
      obj,
      { new: false },
      (err, developerUpdate) => {
        err ? console.error(err) : console.log('Successfully updated genre');
      }
    );
    res.redirect('/catalog/developers');
  } else {
    res.render('permission_denied');
  }
};
