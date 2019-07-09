const Platform = require('../models/platform');

// Display list of all platforms.
exports.platform_list = (req, res, next) => {
  Platform.find()
    .sort([['consoleName', 'ascending']])
    .exec((err, list_platforms) => {
      if (err) return next(err);
      res.render('platform_list', {
        title: 'Platform List',
        platform_list: list_platforms
      });
    });
};

// Display detail page for a specific platform.
exports.platform_detail = (req, res, next) => {
  Platform.findById(req.params.id)
    .populate('platform')
    .exec((err, detail_platform) => {
      if (err) return next(err);
      res.render('platform_detail', {
        title: 'Platform Detail',
        platform_detail: detail_platform
      });
    });
};

// Display platform create form on GET.
exports.platform_create_get = (req, res) => {
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
  platform.save(err =>
    err ? console.error(err) : console.log('Successfully created platform')
  );
  res.redirect('/catalog/platforms');
};

// Display platform delete form on GET.
exports.platform_delete_get = (req, res) => {
  Platform.findById(req.params.id)
    .populate('platform')
    .exec((err, delete_platform) => {
      if (err) return next(err);
      res.render('platform_delete', {
        title: 'Delete Platform',
        platform_delete: delete_platform
      });
    });
};

// Handle platform delete on POST.
exports.platform_delete_post = (req, res) => {
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
  Platform.findById(req.params.id)
    .populate('platform')
    .exec((err, detail_platform) => {
      if (err) return next(err);
      console.log(detail_platform);
      Platform.find()
        .sort([['consoleName', 'ascending']])
        .exec((err, list_platforms) => {
          if (err) return next(err);
          res.render('platform_update', {
            title: 'Update Platform',
            platform_detail: detail_platform,
            platform_list: list_platforms
          });
        });
    });
};

// Handle platform update on POST.
exports.platform_update_post = (req, res) => {
  const obj = {
    consoleName: req.body.consoleName,
    manufacturerName: req.body.manufacturerName,
    medium: req.body.medium
  };
  Platform.findByIdAndUpdate(
    req.params.id,
    obj,
    { new: false },
    (err, platformUpdate) => {
      if (err) {
        console.error(err);
      }
      console.log('Successfully updated platform');
    }
  );
  res.redirect('/catalog/platforms');
};
