const Developer = require('../models/developer');

// Display list of all developers.
exports.developer_list = function(req, res, next) {
  Developer.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_developers) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('developer_list', {
        title: 'Developer List',
        developer_list: list_developers
      });
    });
};

// Display detail page for a specific Developer.
exports.developer_detail = function(req, res, next) {
  Developer.findById(req.params.id)
    .populate('developer')
    .exec(function(err, detail_developer) {
      if (err) {
        return next(err);
      }
      console.log(detail_developer);
      // Successful, so render
      res.render('developer_detail', {
        title: 'Developer Detail',
        developer_detail: detail_developer
      });
    });
};

// Display Developer create form on GET.
exports.developer_create_get = function(req, res) {
  res.render('developer_create', {
    title: 'Create developer'
  });
};

// Handle Developer create on POST.
exports.developer_create_post = function(req, res) {
  const developer = new Developer({
    name: req.body.name
  });
  developer.save(err => {
    err ? console.error(err) : console.log('Successfully created developer');
  });
  res.redirect('/catalog/developers');
};

// Display Developer delete form on GET.
exports.developer_delete_get = function(req, res) {
  Developer.findById(req.params.id)
    .populate('developer')
    .exec((err, delete_developer) => {
      if (err) {
        return next(err);
      }
      res.render('developer_delete', {
        title: 'Delete Developer',
        developer_delete: delete_developer
      });
    });
};

// Handle Developer delete on POST.
exports.developer_delete_post = function(req, res) {
  Developer.remove({ _id: req.params.id }, err => {
    if (!err) {
      console.log('Successfully deleted developer');
      res.redirect('/catalog/developers');
    } else {
      console.error('Error deleting developer');
      res.redirect('/catalog/developers');
    }
  });
};

// Display Developer update form on GET.
exports.developer_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Developer update GET');
};

// Handle Developer update on POST.
exports.developer_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Developer update POST');
};
