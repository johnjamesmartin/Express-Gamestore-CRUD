#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

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
let platforms = [];
let genres = [];
let games = [];
let gameinstances = [];

/* Create a platform:
 *****************************************/
const platformCreate = (consoleName, manufacturerName, medium, cb) => {
  console.log('Creating a platform...');
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
    console.log('Created new platform: ' + platform);
    platforms.push(platform);
    cb(null, platform);
  });
};

/* Create a genre:
 *****************************************/
const genreCreate = (name, cb) => {
  console.log('Creating a genre...');
  const genre = new Genre({ name: name });
  genre.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Created new genre: ' + genre);
    genres.push(genre);
    cb(null, genre);
  });
};

/* Create a game:
 *****************************************/
const gameCreate = (title, platform, developer, genre, releaseYear, cb) => {
  console.log('Creating a game...');
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
    console.log('Created new game: ' + game);
    games.push(game);
    cb(null, game);
  });
};

/* Create a game instance:
 *****************************************/
const gameInstanceCreate = (game, description, price, numberInStock, cb) => {
  console.log('Creating a game instance...');
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
      console.log('Error creating game instance: ' + gameinstance);
      cb(err, null);
      return;
    }
    console.log('Created new game instance: ' + gameinstance);
    gameinstances.push(gameinstance);
    cb(null, game);
  });
};

/* Async:: create genres:
 *****************************************/
const createGenres = cb => {
  console.log('Async:: creating genres');
  async.series(
    [
      callback => {
        genreCreate('Platform', callback); // 0
      },
      callback => {
        genreCreate('Shooter', callback); // 1
      },
      callback => {
        genreCreate('Fighting', callback); // 2
      },
      callback => {
        genreCreate('Action', callback); // 3
      },
      callback => {
        genreCreate('Stealth', callback); // 4
      },
      callback => {
        genreCreate('Survival', callback); // 5
      },
      callback => {
        genreCreate('Rhythm', callback); // 6
      },
      callback => {
        genreCreate('Action-Adventure', callback); // 7
      },
      callback => {
        genreCreate('Adventure', callback); // 8
      },
      callback => {
        genreCreate('RPG', callback); // 9
      },
      callback => {
        genreCreate('MMORPG', callback); // 10
      },
      callback => {
        genreCreate('Sandbox', callback); // 11
      },
      callback => {
        genreCreate('Fantasy', callback); // 12
      },
      callback => {
        genreCreate('Simulation', callback); // 13
      },
      callback => {
        genreCreate('Strategy', callback); // 14
      },
      callback => {
        genreCreate('Racing', callback); // 15
      },
      callback => {
        genreCreate('Party', callback); // 16
      },
      callback => {
        genreCreate('Educational', callback); // 17
      },
      callback => {
        genreCreate('Exergame', callback); // 18
      }
    ],
    cb
  );
};

/* Async:: create platforms:
 *****************************************/
const createPlatforms = cb => {
  console.log('Async:: creating platforms');
  async.series(
    [
      callback => {
        platformCreate(
          'Nintendo Entertainment System',
          'Nintendo',
          'Cartridge',
          callback
        );
      },
      callback => {
        platformCreate('Super Nintendo', 'Nintendo', 'Cartridge', callback);
      },
      callback => {
        platformCreate('Nintendo 64', 'Nintendo', 'Cartridge', callback);
      },
      callback => {
        platformCreate('Nintendo Gamecube', 'Nintendo', 'miniDVD', callback);
      },
      callback => {
        platformCreate('Nintendo Wii', 'Nintendo', 'DVD', callback);
      },
      callback => {
        platformCreate('Nintendo Wii U', 'Nintendo', 'DVD', callback);
      },
      callback => {
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
  console.log('Async:: creating games');
  async.parallel(
    [
      callback => {
        gameCreate(
          'Super Mario Bros.',
          platforms[0],
          'Nintendo',
          genres[0],
          1985,
          callback
        );
      },
      callback => {
        gameCreate(
          'Super Mario 64',
          platforms[2],
          'Nintendo',
          genres[0],
          1996,
          callback
        );
      },
      callback => {
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
  console.log('Async:: creating game instances');
  async.parallel(
    [
      callback => {
        gameInstanceCreate(
          games[0],
          'Good condition in box. Slight tear on bottom corner',
          49.99,
          1,
          callback
        );
      },
      callback => {
        gameInstanceCreate(
          games[0],
          'Mint condition in box. In protective case.',
          1999.99,
          1,
          callback
        );
      },
      callback => {
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
  (err, results) => {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('Game instances: ' + gameinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
