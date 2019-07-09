/* Dependencies
 *****************************************/
const Platform = require('../models/platform');

// GET list of platforms
// Permission: public
// Description: Display a list of platforms
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

// GET details of a platform
// Permission: public
// Description: Display details of a platform
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

// GET page for creating a platform
// Permission: public
// Description: Display create platform form
exports.platform_create_get = (req, res) => {
  res.render('platform_create', {
    title: 'Create Platform'
  });
};

// POST page for creating a platform
// Permission: public
// Description: Post create platform form
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

// GET page for deleting a platform
// Permission: public
// Description: Get delete platform page
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

// POST page for deleting a platform
// Permission: public
// Description: Post delete platform form
exports.platform_delete_post = (req, res) => {
  Platform.remove({ _id: req.params.id }, err => {
    err
      ? console.error('Error deleting platform')
      : console.log('Successfully deleted platform');
    res.redirect('/catalog/platforms');
  });
};

// GET page for updating a platform
// Permission: public
// Description: Get update platform form
exports.platform_update_get = (req, res) => {
  Platform.findById(req.params.id)
    .populate('platform')
    .exec((err, detail_platform) => {
      if (err) return next(err);
      res.render('platform_update', {
        title: 'Update Platform',
        platform_detail: detail_platform
      });
    });
};

// POST page for updating a platform
// Permission: public
// Description: Post update platform form
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
      err ? console.error(err) : console.log('Successfully updated platform');
    }
  );
  res.redirect('/catalog/platforms');
};
