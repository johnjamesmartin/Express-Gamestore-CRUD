const GameInstance = require('../models/gameinstance');

// Display list of all GameInstances.
exports.gameinstance_list = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance list');
};

// Display detail page for a specific GameInstance.
exports.gameinstance_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance detail: ' + req.params.id);
};

// Display GameInstance create form on GET.
exports.gameinstance_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance create GET');
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
