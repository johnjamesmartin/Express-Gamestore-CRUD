#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

/* Dependencies
 *****************************************/
const async = require('async');
const Game = require('./models/game');
const Platform = require('./models/platform');
const Developer = require('./models/developer');
const Genre = require('./models/genre');
const GameInstance = require('./models/gameinstance');
const mongoose = require('mongoose');
const seedData = require('./seedData/data'); // Seed data = games data per console
const data = require('./data'); // Data = additional data like templates for conditions of products, etc.
const seedGenres = require('./seedData/genres/data');

const mongoDB = userArgs[0];

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Get index function:
 *****************************************/
const getIndex = (element, arr, propertyName) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][propertyName] == element) return i;
  }
};

/* Arrays
 *****************************************/
let platforms = [];
let genres = [];
let games = [];
let developers = [];
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
const developerCreate = (name, cb) => {
  console.log('Creating a developer...');
  const developer = new Developer({ name: name });
  developer.save(err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Created new developer: ' + developer);
    developers.push(developer);
    cb(null, developer);
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
  console.log(developer);
  gamedetail = {
    title: title,
    platform: platform,
    console: platform.consoleName,
    medium: platform.medium,
    developer: developer,
    developerInfo: developer.name,
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
const createDevelopers = cb => {
  console.log('Async:: creating developers');
  async.series(
    [
      callback => {
        developerCreate('Nintendo', callback); // 0
      },
      callback => {
        developerCreate('Capcom', callback); // 1
      },
      callback => {
        developerCreate('Namco', callback); // 2
      },
      callback => {
        developerCreate('Konami', callback); // 2
      },
      callback => {
        developerCreate('Rare', callback); // 2
      }
    ],
    cb
  );
};

/* Async:: create genres:
 *****************************************/
const createGenres = cb => {
  console.log('Async:: creating genres');

  /*
  var genresArr = [];
  var gen;
  for (var i = 0; i < seedGenres.length; i++) {
    gen = seedGenres[i]['name'];
    genresArr.push(callback => {
      genreCreate(gen.toString(), callback);
    });
  }

  async.series(genresArr, cb);
  */

  async.series(
    [
      callback => {
        genreCreate('Platformer', callback); // 0
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
        genreCreate('Puzzle', callback); // 17
      },
      callback => {
        genreCreate('Sports', callback); // 18
      },
      callback => {
        genreCreate('Side-scroller', callback); // 18
      },
      callback => {
        genreCreate('Maze', callback); // 18
      },
      callback => {
        genreCreate('Educational', callback); // 19
      },
      callback => {
        genreCreate('Exergame', callback); // 20
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
      },
      callback => {
        platformCreate('Nintendo Gameboy', 'Nintendo', 'Cartridge', callback);
      },
      callback => {
        platformCreate(
          'Nintendo Gameboy Color',
          'Nintendo',
          'Cartridge',
          callback
        );
      },
      callback => {
        platformCreate(
          'Nintendo Gameboy Advance',
          'Nintendo',
          'Cartridge',
          callback
        );
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
  let seedGameArray = [];

  const addGamesByPlatform = (
    platformGames,
    platformObj,
    developerObj,
    genresObj,
    releaseYear
  ) => {
    for (let i = 0; i < platformGames.length; i++) {
      seedGameArray.push(callback => {
        gameCreate(
          platformGames[i].name,
          platforms[
            getIndex(
              platformObj.platform,
              platformObj.arr,
              platformObj.property
            )
          ],
          developers[
            getIndex(
              developerObj.developer[i].developer,
              developerObj.arr,
              developerObj.property
            )
          ],
          genres[
            getIndex(
              genresObj.genre[i].genre,
              genresObj.arr,
              genresObj.property
            )
          ],
          platformGames[i].releaseYear,
          callback
        );
      });
    }
  };

  // NES Games
  const nesGames = addGamesByPlatform(
    seedData.gameData.nesGamesArr,
    {
      platform: 'Nintendo Entertainment System',
      arr: platforms,
      property: 'consoleName'
    },
    {
      developer: seedData.gameData.nesGamesArr,
      arr: developers,
      property: 'name'
    },
    {
      genre: seedData.gameData.nesGamesArr,
      arr: genres,
      property: 'name'
    }
  );

  // N64 Games
  const n64Games = addGamesByPlatform(
    seedData.gameData.n64GamesArr,
    {
      platform: 'Nintendo 64',
      arr: platforms,
      property: 'consoleName'
    },
    {
      developer: seedData.gameData.n64GamesArr,
      arr: developers,
      property: 'name'
    },
    {
      genre: seedData.gameData.n64GamesArr,
      arr: genres,
      property: 'name'
    }
  );

  async.parallel(seedGameArray, cb);

  /*

  async.parallel(
    [
      callback => {
        gameCreate(
          'Super Mario Bros.',
          platforms[
            getIndex('Nintendo Entertainment System', platforms, 'consoleName')
          ],
          developers[getIndex('Nintendo', developers, 'name')],
          genres[getIndex('Platform', genres, 'name')],
          1985,
          callback
        );
      },
      callback => {
        gameCreate(
          'Super Mario Bros. Deluxe',
          platforms[
            getIndex('Nintendo Gameboy Color', platforms, 'consoleName')
          ],
          developers[getIndex('Nintendo', developers, 'name')],
          genres[getIndex('Platform', genres, 'name')],
          1999,
          callback
        );
      },
      callback => {
        gameCreate(
          'Super Mario 64',
          platforms[2],
          developers[0],
          genres[0],
          1996,
          callback
        );
      },
      callback => {
        gameCreate(
          'The Legend of Zelda: Ocarina of Time',
          platforms[2],
          developers[0],
          genres[7],
          1998,
          callback
        );
      }
    ],
    // optional callback
    cb
  );
  */
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
          `Product Description: Cartridge only. There is a minor scratch on game cartridge label, but tested and working fine. --- Condition: ${
            data.conditions[0]
          }`,
          49.99,
          1,
          callback
        );
      }
    ],
    // Optional callback
    cb
  );
};

/* Drop all collections (removes all data)
 *****************************************/
const dropAllCollections = () => {
  Game.collection.drop();
  Platform.collection.drop();
  Developer.collection.drop();
  Genre.collection.drop();
  GameInstance.collection.drop();
};

dropAllCollections();

/* Init::: Async series
 *****************************************/
async.series(
  [
    createPlatforms,
    createDevelopers,
    createGenres,
    createGames,
    createGameInstances
  ],
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
