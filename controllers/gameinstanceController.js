/* Dependencies
 *****************************************/
const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const Platform = require('../models/platform');
const data = require('../data');

// GET list of game instances
// Permission: public
// Description: Display a list of game instances
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

// GET details of a game instances
// Permission: public
// Description: Display details of a game instance
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

// GET page for creating a game instance
// Permission: public
// Description: Display create game instance form
exports.gameinstance_create_get = (req, res) => {
  Game.find()
    .populate('games')
    .sort([['title', 'ascending']])
    .exec((err, list_games) => {
      if (err) return next(err);
      Platform.find()
        .populate('platforms')
        .exec((err, list_platforms) => {
          if (err) return next(err);
          res.render('gameinstance_create', {
            title: 'Game Instance Create',
            list_games,
            list_platforms,
            conditions: data.conditions
          });
        });
    });
};

// GET page for creating a game instance
// Permission: public
// Description: Display create game instance form
exports.gameinstance_create_post = (req, res) => {
  Game.find({ title: req.body.game.split(' ~')[0].toString() }).exec(
    (err, game) => {
      if (err) {
      } else {
        Platform.find({ console: req.body.platform }).exec((err, platform) => {
          if (err) {
          } else {
            let gameObj = {
              game: game[0].id,
              console: game[0].console,
              manufacturer: platform[0].manufacturerName,
              medium: game[0].medium,
              description: `Product description: ${
                req.body.description
              } --- Condition: ${req.body.condition}`,
              price: req.body.price,
              numberInStock: req.body.numberInStock
            };
            const gameInstance = new GameInstance(gameObj);
            gameInstance.save(err => {
              err
                ? console.error(err)
                : console.log('Successfully created game instance');
            });
          }
        });
      }
    }
  );
  res.redirect('/catalog/gameinstances');
};

// GET page for deleting a game instance
// Permission: public
// Description: Get delete game instance form
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

// POST page for deleting a game instance
// Permission: public
// Description: Post delete game instance form
exports.gameinstance_delete_post = (req, res) => {
  GameInstance.remove({ _id: req.params.id }, err => {
    err
      ? console.error('Error deleting game instance')
      : console.log('Successfully deleted game instance');
    res.redirect('/catalog/gameinstances');
  });
};

// GET page for updating a game instance
// Permission: public
// Description: Get update game instance form
exports.gameinstance_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: GameInstance update GET');
};

// POST page for updating a game instance
// Permission: public
// Description: Post update game instance form
exports.gameinstance_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: GameInstance update POST');
};
