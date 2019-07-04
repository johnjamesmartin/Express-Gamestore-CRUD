const Game = require('../models/game');
const Platform = require('../models/platform');
const Genre = require('../models/genre');
const GameInstance = require('../models/gameinstance');

const async = require('async');

exports.index = function(req, res) {
  async.parallel(
    {
      game_count: function(callback) {
        Game.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      game_instance_count: function(callback) {
        GameInstance.countDocuments({}, callback);
      },
      game_instance_available_count: function(callback) {
        GameInstance.countDocuments({ status: 'Available' }, callback);
      },
      platform_count: function(callback) {
        Platform.countDocuments({}, callback);
      },
      genre_count: function(callback) {
        Genre.countDocuments({}, callback);
      }
    },
    function(err, results) {
      res.render('index', {
        title: 'Gamestore Home',
        error: err,
        data: results
      });
    }
  );
};

// Display list of all gameInstances.
exports.gameinstance_list = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance list');
};

// Display detail page for a specific gameInstance.
exports.gameinstance_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance detail: ' + req.params.id);
};

// Display gameInstance create form on GET.
exports.gameinstance_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance create GET');
};

// Handle gameInstance create on POST.
exports.gameinstance_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance create POST');
};

// Display gameInstance delete form on GET.
exports.gameinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance delete GET');
};

// Handle gameInstance delete on POST.
exports.gameinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance delete POST');
};

// Display gameInstance update form on GET.
exports.gameinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance update GET');
};

// Handle gameinstance update on POST.
exports.gameinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: gameInstance update POST');
};
