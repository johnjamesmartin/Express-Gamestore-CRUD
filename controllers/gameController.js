/* Dependencies:
 *****************************************/
const async = require('async');

const Game = require('../models/game');
const Platform = require('../models/platform');
const Genre = require('../models/genre');
const GameInstance = require('../models/gameinstance');

/* Homepage index route:
 *****************************************/
exports.index = (req, res) => {
  async.parallel(
    {
      game_count: callback => {
        // Pass empty object as match condition to find all documents of this collection
        Game.countDocuments({}, callback);
      },
      game_instance_count: callback => {
        GameInstance.countDocuments({}, callback);
      },
      game_instance_available_count: callback => {
        GameInstance.countDocuments({ status: 'Available' }, callback);
      },
      platform_count: callback => {
        Platform.countDocuments({}, callback);
      },
      genre_count: callback => {
        Genre.countDocuments({}, callback);
      }
    },
    (err, results) => {
      res.render('index', {
        title: 'Gamestore Home',
        error: err,
        data: results
      });
    }
  );
};

/* Display game list (list of all games):
 *****************************************/
exports.game_list = (req, res, next) => {
  Game.find({}, 'title platform')
    .populate('platform')
    .exec((err, list_games) => {
      if (err) {
        return next(err);
      }
      res.render('game_list', { title: 'Game List', game_list: list_games });
    });
};

/* Display specific game:
 *****************************************/
exports.game_detail = (req, res, next) => {
  Game.findById(req.params.id)
    .populate('game')
    .exec((err, detail_game) => {
      if (err) {
        return next(err);
      }
      res.render('game_detail', {
        title: 'Game Detail',
        game_detail: detail_game
      });
    });
};

/* Display page to delete game:
 *****************************************/
exports.game_delete_get = (req, res) => {
  Game.findById(req.params.id)
    .populate('game')
    .exec((err, detail_game) => {
      if (err) {
        return next(err);
      }
      res.render('game_delete', {
        title: 'Delete Game',
        game_detail: detail_game
      });
    });
};

/* Delete game:
 *****************************************/
exports.game_delete_post = (req, res) => {
  Game.remove({ _id: req.params.id }, err => {
    if (!err) {
      console.log('Successfully deleted game');
      res.redirect('/catalog/games');
    } else {
      console.error('Error deleting game');
      res.redirect('/catalog/games');
    }
  });
};

/* Create game form:
 *****************************************/
exports.game_create_get = (req, res, next) => {
  res.render('game_create', { title: 'Create game' });
};

/* Display list of game instances:
 *****************************************/
exports.gameinstance_list = (req, res) => {
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
