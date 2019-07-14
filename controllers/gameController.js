/* Dependencies:
 *****************************************/
const async = require('async');
const Game = require('../models/game');
const Platform = require('../models/platform');
const Developer = require('../models/developer');
const Genre = require('../models/genre');
const GameInstance = require('../models/gameinstance');

/* Homepage index route:
 *****************************************/
exports.index = (req, res) => {
  async.parallel(
    {
      // Pass empty object as match condition to find all documents of this collection
      game_count: callback => {
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
      console.log(req.user);
      res.render('index', {
        title: 'Gamestore Home',
        user: req.user,
        error: err,
        data: results
      });
    }
  );
};

// GET list of games
// Permission: public
// Description: Display a list of games
exports.game_list = (req, res, next) => {
  Game.find({}, 'title platform')
    .populate('platform')
    .exec((err, list_games) => {
      if (err) return next(err);
      res.render('game_list', { title: 'Game List', game_list: list_games });
    });
};

// GET details of a game
// Permission: public
// Description: Display details of a game
exports.game_detail = (req, res, next) => {
  Game.findById(req.params.id)
    .populate('game')
    .exec((err, detail_game) => {
      if (err) return next(err);
      Developer.findById(detail_game.developer)
        .populate('developer')
        .exec((err, developer) => {
          if (err) return next(err);
          res.render('game_detail', {
            title: 'Game Detail',
            game_detail: detail_game,
            developer: developer
          });
        });
    });
};

// GET page for deleting a game
// Permission: private (admin only)
// Description: Display delete game form
exports.game_delete_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Game.findById(req.params.id)
      .populate('game')
      .exec((err, delete_game) => {
        if (err) return next(err);
        res.render('game_delete', {
          title: 'Delete Game',
          game_delete: delete_game
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for deleting a game
// Permission: private (admin only)
// Description: Post delete game form
exports.game_delete_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Game.remove({ _id: req.params.id }, err => {
      err
        ? console.error('Error deleting game')
        : console.log('Successfully deleted game');
      res.redirect('/catalog/games');
    });
  } else {
    res.render('permission_denied');
  }
};

// GET page for creating a game
// Permission: private (admin only)
// Description: Display create game form
exports.game_create_get = (req, res, next) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Platform.find()
      .sort([['platform', 'ascending']])
      .exec((err, list_platforms) => {
        if (err) return next(err);
        Genre.find()
          .sort([['name', 'ascending']])
          .exec((err, list_genres) => {
            if (err) return next(err);
            Developer.find()
              .sort([['name', 'ascending']])
              .exec((err, list_developers) => {
                if (err) return next(err);
                res.render('game_create', {
                  title: 'Create game',
                  list_platforms,
                  list_genres,
                  list_developers
                });
              });
          });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for creating a game
// Permission: private (admin only)
// Description: Post create game form
exports.game_create_post = (req, res, next) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    let gameObj;
    Platform.find({ consoleName: req.body.platform }).exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        Genre.find({ name: req.body.genre }).exec((err, genre) => {
          if (err) {
            console.Error(err);
          } else {
            Developer.find({ name: req.body.developer }).exec(
              (err, developer) => {
                if (err) {
                  console.error(err);
                } else {
                  gameObj = {
                    title: req.body.title,
                    platform: data[0].id,
                    developer: developer[0],
                    genreInfo: genre[0],
                    genre: genre[0].id,
                    console: data[0].consoleName,
                    medium: data[0].medium,
                    releaseYear: req.body.releaseYear
                  };
                  const game = new Game(gameObj);
                  game.save(err => {
                    err
                      ? console.error(err)
                      : console.log('Successfully created game');
                  });
                }
              }
            );
          }
        });
      }
    });
    res.redirect('/catalog/games');
  } else {
    res.render('permission_denied');
  }
};

// GET page for updating a game
// Permission: private (admin only)
// Description: Display update game form
exports.game_update_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Platform.find()
      .sort([['platform', 'ascending']])
      .exec((err, list_platforms) => {
        if (err) {
          return next(err);
        }
        Genre.find()
          .sort([['name', 'ascending']])
          .exec((err, list_genres) => {
            if (err) return next(err);
            Developer.find()
              .sort([['name', 'ascending']])
              .exec((err, list_developers) => {
                if (err) return next(err);
                Game.findById(req.params.id).exec((err, game) => {
                  if (err) return next(err);
                  res.render('game_update', {
                    title: 'Update game',
                    game: game,
                    list_platforms,
                    list_genres,
                    list_developers
                  });
                });
              });
          });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for updating a game
// Permission: private (admin only)
// Description: Post update game form
exports.game_update_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Game.findById(req.body.gameid, (err, game) => {
      if (err) console.error(err);
      Developer.find({ name: req.body.developer }, (err, developer) => {
        if (err) console.error(err);
        Platform.find({ consoleName: req.body.platform }, (err, platform) => {
          if (err) console.error(err);
          Genre.find({ name: req.body.genre }, (err, genre) => {
            if (err) console.error(err);
            const obj = {
              title: req.body.title,
              platform: platform[0]._id,
              developer: developer[0]._id,
              developerInfo: developer[0].name,
              genreInfo: genre[0],
              genre: genre[0]._id,
              console: platform[0].consoleName,
              medium: platform[0].medium,
              releaseYear: req.body.releaseYear
            };
            Game.findByIdAndUpdate(
              req.body.gameid,
              obj,
              { new: false },
              (err, gameUpdate) => {
                err ? console.error(err) : console.log(gameUpdate);
              }
            );
            res.redirect('/catalog/games');
          });
        });
      });
    });
  } else {
    res.render('permission_denied');
  }
};
