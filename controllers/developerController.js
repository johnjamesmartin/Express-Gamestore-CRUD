const Developer = require('../models/developer');

// Display list of all developers.
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

// Display detail page for a specific Developer.
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

// Display Developer create form on GET.
exports.developer_create_get = (req, res) => {
  res.render('developer_create', {
    title: 'Create developer'
  });
};

// Handle Developer create on POST.
exports.developer_create_post = (req, res) => {
  const developer = new Developer({
    name: req.body.name
  });
  developer.save(err =>
    err ? console.error(err) : console.log('Successfully created developer')
  );
  res.redirect('/catalog/developers');
};

// Display Developer delete form on GET.
exports.developer_delete_get = (req, res) => {
  Developer.findById(req.params.id)
    .populate('developer')
    .exec((err, delete_developer) => {
      if (err) return next(err);
      res.render('developer_delete', {
        title: 'Delete Developer',
        developer_delete: delete_developer
      });
    });
};

// Handle Developer delete on POST.
exports.developer_delete_post = (req, res) => {
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
