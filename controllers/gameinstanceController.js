const GameInstance = require('../models/gameinstance');

// Display list of all GameInstances.
exports.gameinstance_list = function(req, res, next) {
  GameInstance.find()
    .populate('game')
    .exec(function(err, list_gameinstances) {
      if (err) {
        return next(err);
      }
      console.log(list_gameinstances);
      // Successful, so render
      res.render('gameinstance_list', {
        title: 'Game Instance List',
        gameinstance_list: list_gameinstances
      });
    });
};

// Display detail page for a specific GameInstance.
exports.gameinstance_detail = function(req, res) {
  GameInstance.findById(req.params.id)
    .populate('game')
    .exec(function(err, detail_gameinstance) {
      if (err) {
        return next(err);
      }
      console.log(detail_gameinstance);
      // Successful, so render
      res.render('gameinstance_detail', {
        title: 'Game Instance Detail',
        gameinstance_detail: detail_gameinstance
      });
    });
};

// Display GameInstance create form on GET.
exports.gameinstance_create_get = function(req, res) {
  res.render('gameinstance_create', { title: 'Create gameinstance' });
};

// Handle GameInstance create on POST.
exports.gameinstance_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance create POST');
};

// Display GameInstance delete form on GET.
exports.gameinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance delete GET');
};

// Handle GameInstance delete on POST.
exports.gameinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance delete POST');
};

// Display GameInstance update form on GET.
exports.gameinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance update GET');
};

// Handle gameinstance update on POST.
exports.gameinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance update POST');
};
