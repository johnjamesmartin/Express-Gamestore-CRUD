/* Dependencies
 *****************************************/
const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const Platform = require('../models/platform');
const data = require('../data');
const User = require('../models/user');

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
        gameinstance_list: list_gameinstances,
        user: res.locals.currentUser
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
      User.findById(detail_gameinstance.createdBy)
        .populate('createdBy')
        .exec((err, createdBy) => {
          if (err) return next(err);
          res.render('gameinstance_detail', {
            title: 'Game Instance Detail',
            gameinstance_detail: detail_gameinstance,
            createdBy: createdBy,
            user: res.locals.currentUser
          });
        });
    });
};

// GET page for creating a game instance
// Permission: public
// Description: Display create game instance form
exports.gameinstance_create_get = (req, res) => {
  if (res.locals.currentUser) {
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
  } else {
    res.render('sign-up');
  }
};

// GET page for creating a game instance
// Permission: private
// Description: Display create game instance form
exports.gameinstance_create_post = (req, res) => {
  if (res.locals.currentUser) {
    Game.find({ title: req.body.game.split(' ~')[0].toString() }).exec(
      (err, game) => {
        if (err) {
        } else {
          Platform.find({ console: req.body.platform }).exec(
            (err, platform) => {
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
                  numberInStock: req.body.numberInStock,
                  createdBy: res.locals.currentUser
                };
                const gameInstance = new GameInstance(gameObj);
                gameInstance.save(err => {
                  err
                    ? console.error(err)
                    : console.log('Successfully created game instance');
                });
              }
            }
          );
        }
      }
    );
    res.redirect('/catalog/gameinstances');
  } else {
    res.render('sign-up');
  }
};

// GET page for deleting a game instance
// Permission: private (only admin and creator of gameinstance)
// Description: Get delete game instance form
exports.gameinstance_delete_get = (req, res) => {
  if (res.locals.currentUser) {
    GameInstance.findById(req.params.id)
      .populate('game')
      .exec((err, delete_gameinstance) => {
        if (err) return next(err);
        User.findById(delete_gameinstance.createdBy)
          .populate('user')
          .exec((err, delete_gameinstance) => {
            if (err) return next(err);
            // if user is less than level 2 make this gameinstance was created by them:
            if (
              res.locals.currentUser._id.toString() ===
              delete_gameinstance._id.toString()
            ) {
              res.render('gameinstance_delete', {
                title: 'Game Instance Delete',
                gameinstance_delete: delete_gameinstance
              });
              // Or redirect them to permission denied page:
            } else {
              res.render('permission_denied');
            }
          });
      });
  } else {
    res.render('sign-up');
  }
};

// POST page for deleting a game instance
// Permission: private (logged in user)
// Description: Post delete game instance form
exports.gameinstance_delete_post = (req, res) => {
  if (res.locals.currentUser) {
    GameInstance.remove({ _id: req.params.id }, err => {
      err
        ? console.error('Error deleting game instance')
        : console.log('Successfully deleted game instance');
      res.redirect('/catalog/gameinstances');
    });
  } else {
    console.log('Must be logged in');
  }
};

// GET page for updating a game instance
// Permission: public
// Description: Get update game instance form
exports.gameinstance_update_get = (req, res) => {
  Game.find()
    .populate('games')
    .sort([['title', 'ascending']])
    .exec((err, list_games) => {
      if (err) return next(err);
      Platform.find()
        .populate('platforms')
        .exec((err, list_platforms) => {
          if (err) return next(err);
          GameInstance.findById(req.params.id)
            .populate('game')
            .exec((err, gameinstance) => {
              if (err) return next(err);
              User.findById(gameinstance.createdBy)
                .populate('user')
                .exec((err, userinstance) => {
                  if (err) return next(err);
                  // if user is less than level 2 make this gameinstance was created by them:
                  if (
                    res.locals.currentUser._id.toString() ===
                    userinstance._id.toString()
                  ) {
                    res.render('gameinstance_update', {
                      title: 'Game Instance Update',
                      list_games,
                      list_platforms,
                      gameinstance,
                      conditions: data.conditions
                    });
                    // Or redirect them to permission denied page:
                  } else {
                    res.render('permission_denied');
                  }
                });
            });
        });
    });
};

// POST page for updating a game instance
// Permission: public
// Description: Post update game instance form
exports.gameinstance_update_post = (req, res) => {
  Game.find({ title: req.body.game.split(' ~')[0].toString() }).exec(
    (err, game) => {
      if (err) {
        console.error(err);
      } else {
        Platform.findById(game[0].platform).exec((err, platform) => {
          if (err) {
            console.error(err);
          } else {
            const obj = {
              game: game[0]._id,
              console: game[0].console,
              manufacturer: platform.manufacturerName,
              medium: platform.medium,
              description: `Product Description: ${
                req.body.description
              } --- Condition: ${req.body.condition}`,
              price: req.body.price,
              numberInStock: req.body.numberInStock
            };
            GameInstance.findByIdAndUpdate(
              req.params.id,
              obj,
              { new: false },
              (err, gameInstanceUpdate) => {
                err
                  ? console.error(err)
                  : console.log('Successfully updated game instance');
              }
            );
            res.redirect('/catalog/gameinstances');
          }
        });
      }
    }
  );
};
