const Platform = require('../models/platform');

// Display list of all platforms.
exports.platform_list = function(req, res, next) {
  Platform.find()
    //.sort([['family_name', 'ascending']])
    .exec(function(err, list_platforms) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('platform_list', {
        title: 'Platform List',
        platform_list: list_platforms
      });
    });
};

// Display detail page for a specific platform.
exports.platform_detail = function(req, res, next) {
  Platform.findById(req.params.id)
    .populate('platform')
    .exec(function(err, detail_platform) {
      if (err) {
        return next(err);
      }
      console.log(detail_platform);
      // Successful, so render
      res.render('platform_detail', {
        title: 'Platform Detail',
        platform_detail: detail_platform
      });
    });
};

// Display platform create form on GET.
exports.platform_create_get = function(req, res) {
  res.render('platform_create', {
    title: 'Create Platform'
  });
};

// Handle platform create on POST.
exports.platform_create_post = (req, res) => {
  const platform = new Platform({
    consoleName: req.body.consoleName,
    manufacturerName: req.body.manufacturerName,
    medium: req.body.medium
  });
  platform.save(err => {
    err ? console.error(err) : console.log('Successfully created platform');
  });
  res.redirect('/catalog/platforms');
};

// Display platform delete form on GET.
exports.platform_delete_get = function(req, res) {
  Platform.findById(req.params.id)
    .populate('platform')
    .exec((err, delete_platform) => {
      if (err) {
        return next(err);
      }
      res.render('platform_delete', {
        title: 'Delete Platform',
        platform_delete: delete_platform
      });
    });
};

// Handle platform delete on POST.
exports.platform_delete_post = function(req, res) {
  Platform.remove({ _id: req.params.id }, err => {
    if (!err) {
      console.log('Successfully deleted platform');
      res.redirect('/catalog/platforms');
    } else {
      console.error('Error deleting platform');
      res.redirect('/catalog/platforms');
    }
  });
};

// Display platform update form on GET.
exports.platform_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: platform update GET');
};

// Handle platform update on POST.
exports.platform_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: platform update POST');
};
