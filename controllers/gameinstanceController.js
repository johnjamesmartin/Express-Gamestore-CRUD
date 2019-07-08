const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const Platform = require('../models/platform');

// Display list of all game instances.
exports.gameinstance_list = (req, res, next) => {
  GameInstance.find()
    .populate('game')
    .exec((err, list_gameinstances) => {
      if (err) return next(err);
      res.render('gameinstance_list', {
        title: 'Game Instance List',
        gameinstance_list: list_gameinstances
      });
    });
};

// Display page for a specific game instance.
exports.gameinstance_detail = (req, res) => {
  GameInstance.findById(req.params.id)
    .populate('game')
    .exec((err, detail_gameinstance) => {
      if (err) return next(err);
      res.render('gameinstance_detail', {
        title: 'Game Instance Detail',
        gameinstance_detail: detail_gameinstance
      });
    });
};

// Display GameInstance create form on GET.
exports.gameinstance_create_get = (req, res) => {
  Game.find()
    .populate('games')
    .exec((err, list_games) => {
      if (err) return next(err);
      res.render('gameinstance_create', {
        title: 'Game Instance Detail',
        list_games
      });
    });
};

// Handle GameInstance create on POST.
exports.gameinstance_create_post = (req, res) => {
  Game.find({ title: req.body.game }).exec((err, game) => {
    if (err) {
      console.Error(err);
    } else {
      Platform.find({ console: req.body.platform }).exec((err, platform) => {
        if (err) {
          console.error(err);
        } else {
          let gameObj = {
            game: game[0].id,
            console: game[0].console,
            manufacturer: platform[0].manufacturerName,
            medium: game[0].medium,
            description: req.body.description,
            price: req.body.price,
            numberInStock: req.body.numberInStock
          };
          const gameInstance = new GameInstance(gameObj);
          gameInstance.save(err => {
            err ? console.error(err) : console.log('Successfully created game');
          });
        }
      });
    }
  });
  res.redirect('/catalog/gameinstances');
};

// Display game instance delete form on GET.
exports.gameinstance_delete_get = (req, res) => {
  GameInstance.findById(req.params.id)
    .populate('game')
    .exec((err, delete_gameinstance) => {
      if (err) return next(err);
      res.render('gameinstance_delete', {
        title: 'Game Instance Delete',
        gameinstance_delete: delete_gameinstance
      });
    });
};

// Handle game instance delete on POST.
exports.gameinstance_delete_post = (req, res) => {
  GameInstance.remove({ _id: req.params.id }, err => {
    if (!err) {
      console.log('Successfully deleted game instance');
      res.redirect('/catalog/gameinstances');
    } else {
      console.error('Error deleting game instance');
      res.redirect('/catalog/gameinstances');
    }
  });
};

// Display GameInstance update form on GET.
exports.gameinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance update GET');
};

// Handle gameinstance update on POST.
exports.gameinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: GameInstance update POST');
};
