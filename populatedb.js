#! /usr/bin/env node

console.log(
  'This script populates some test games, platforms, genres and gameinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

/* Dependencies
 *****************************************/
const async = require('async');
const Game = require('./models/game');
const Platform = require('./models/platform');
const Genre = require('./models/genre');
const GameInstance = require('./models/gameinstance');
const mongoose = require('mongoose');
const mongoDB = userArgs[0];

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Arrays
 *****************************************/
var platforms = [];
var genres = [];
var games = [];
var gameinstances = [];

/* Create a platform:
 *****************************************/
const platformCreate = (consoleName, manufacturerName, medium, cb) => {
  console.log('Create a platform');
  platformdetail = {
    consoleName: consoleName,
    manufacturerName: manufacturerName,
    medium: medium
  };
  const platform = new Platform(platformdetail);
  platform.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New platform created: ' + platform);
    platforms.push(platform);
    cb(null, platform);
  });
};

/* Create a genre:
 *****************************************/
const genreCreate = (name, cb) => {
  console.log('Create a genre');
  const genre = new Genre({ name: name });
  genre.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New genre created: ' + genre);
    genres.push(genre);
    cb(null, genre);
  });
};

/* Create a game:
 *****************************************/
const gameCreate = (title, platform, developer, genre, releaseYear, cb) => {
  console.log('Create a game');
  gamedetail = {
    title: title,
    platform: platform,
    console: platform.consoleName,
    medium: platform.medium,
    developer: developer,
    genre: genre,
    genreInfo: genre
  };
  if (releaseYear != false) gamedetail.releaseYear = releaseYear;
  const game = new Game(gamedetail);
  game.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New game created: ' + game);
    games.push(game);
    cb(null, game);
  });
};

/* Create a game instance:
 *****************************************/
const gameInstanceCreate = (game, description, price, numberInStock, cb) => {
  console.log('Create a game instance');
  gameinstancedetail = {
    game: game,
    console: game.platform.consoleName,
    manufacturer: game.platform.manufacturerName,
    medium: game.platform.medium,
    description: description,
    price: price,
    numberInStock: numberInStock
  };
  const gameinstance = new GameInstance(gameinstancedetail);
  gameinstance.save(err => {
    console.log(err);
    if (err) {
      console.log('ERROR CREATING GameInstance: ' + gameinstance);
      cb(err, null);
      return;
    }
    console.log('New GameInstance: ' + gameinstance);
    gameinstances.push(gameinstance);
    cb(null, game);
  });
};

/* Async:: create genres:
 *****************************************/
const createGenres = cb => {
  console.log('Async:: create genres');
  async.series(
    [
      function(callback) {
        genreCreate('Platform', callback); // 0
      },
      function(callback) {
        genreCreate('Shooter', callback); // 1
      },
      function(callback) {
        genreCreate('Fighting', callback); // 2
      },
      function(callback) {
        genreCreate('Action', callback); // 3
      },
      function(callback) {
        genreCreate('Stealth', callback); // 4
      },
      function(callback) {
        genreCreate('Survival', callback); // 5
      },
      function(callback) {
        genreCreate('Rhythm', callback); // 6
      },
      function(callback) {
        genreCreate('Action-Adventure', callback); // 7
      },
      function(callback) {
        genreCreate('Adventure', callback); // 8
      },
      function(callback) {
        genreCreate('RPG', callback); // 9
      },
      function(callback) {
        genreCreate('MMORPG', callback); // 10
      },
      function(callback) {
        genreCreate('Sandbox', callback); // 11
      },
      function(callback) {
        genreCreate('Fantasy', callback); // 12
      },
      function(callback) {
        genreCreate('Simulation', callback); // 13
      },
      function(callback) {
        genreCreate('Strategy', callback); // 14
      },
      function(callback) {
        genreCreate('Racing', callback); // 15
      },
      function(callback) {
        genreCreate('Party', callback); // 16
      },
      function(callback) {
        genreCreate('Educational', callback); // 17
      },
      function(callback) {
        genreCreate('Exergame', callback); // 18
      }
    ],
    cb
  );
};

/* Async:: create platforms:
 *****************************************/
const createPlatforms = cb => {
  console.log('Async:: create platforms');
  async.series(
    [
      function(callback) {
        platformCreate(
          'Nintendo Entertainment System',
          'Nintendo',
          'Cartridge',
          callback
        );
      },
      function(callback) {
        platformCreate('Super Nintendo', 'Nintendo', 'Cartridge', callback);
      },
      function(callback) {
        platformCreate('Nintendo 64', 'Nintendo', 'Cartridge', callback);
      },
      function(callback) {
        platformCreate('Nintendo Gamecube', 'Nintendo', 'miniDVD', callback);
      },
      function(callback) {
        platformCreate('Nintendo Wii', 'Nintendo', 'DVD', callback);
      },
      function(callback) {
        platformCreate('Nintendo Wii U', 'Nintendo', 'DVD', callback);
      },
      function(callback) {
        platformCreate('Nintendo Switch', 'Nintendo', 'Game Card', callback);
      }
    ],
    // optional callback
    cb
  );
};

/* Async:: create games:
 *****************************************/
const createGames = cb => {
  console.log('Async:: create games');
  async.parallel(
    [
      function(callback) {
        gameCreate(
          'Super Mario Bros.',
          platforms[0],
          'Nintendo',
          genres[0],
          1985,
          callback
        );
      },
      function(callback) {
        gameCreate(
          'Super Mario 64.',
          platforms[2],
          'Nintendo',
          genres[0],
          1996,
          callback
        );
      },
      function(callback) {
        gameCreate(
          'The Legend of Zelda: Ocarina of Time',
          platforms[2],
          'Nintendo',
          genres[7],
          1998,
          callback
        );
      }
    ],
    // optional callback
    cb
  );
};

/* Async:: create game instances:
 *****************************************/
const createGameInstances = cb => {
  console.log('Async:: create game instances');
  async.parallel(
    [
      function(callback) {
        gameInstanceCreate(
          games[0],
          'Good condition in box. Slight tear on bottom corner',
          49.99,
          1,
          callback
        );
      },
      function(callback) {
        gameInstanceCreate(
          games[0],
          'Mint condition in box. In protective case.',
          1999.99,
          1,
          callback
        );
      },
      function(callback) {
        gameInstanceCreate(
          games[2],
          'Cartridge only. Fair condition',
          29.99,
          1,
          callback
        );
      }
    ],
    // Optional callback
    cb
  );
};

/* Init::: Async series
 *****************************************/
async.series(
  [createPlatforms, createGenres, createGames, createGameInstances],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Game instances: ' + gameinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
