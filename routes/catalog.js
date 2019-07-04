/* Dependencies
 *****************************************/
const express = require('express');
const router = express.Router();

/* Controller modules
 *****************************************/
const game_controller = require('../controllers/gameController');
const platform_controller = require('../controllers/platformController');
const genre_controller = require('../controllers/genreController');
const game_instance_controller = require('../controllers/gameinstanceController');

/* Routes
 *****************************************/
router.get('/', game_controller.index);

// GET request for creating a game. NOTE This must come before routes that display game (uses id).
//router.get('/game/create', game_controller.game_create_get);

// POST request for creating game.
//router.post('/game/create', game_controller.game_create_post);

/*
// GET request to delete game.
router.get('/game/:id/delete', game_controller.game_delete_get);

// POST request to delete game.
router.post('/game/:id/delete', game_controller.game_delete_post);

// GET request to update game.
router.get('/game/:id/update', game_controller.game_update_get);

// POST request to update game.
router.post('/game/:id/update', game_controller.game_update_post);

// GET request for one game.
router.get('/game/:id', game_controller.game_detail);

// GET request for list of all game items.
router.get('/games', game_controller.game_list);

/// PLATFORM ROUTES ///

// GET request for creating platform. NOTE This must come before route for id (i.e. display platform).
router.get('/platform/create', platform_controller.platform_create_get);

// POST request for creating platform.
router.post('/platform/create', platform_controller.platform_create_post);

// GET request to delete platform.
router.get('/platform/:id/delete', platform_controller.platform_delete_get);

// POST request to delete platform.
router.post('/platform/:id/delete', platform_controller.platform_delete_post);

// GET request to update platform.
router.get('/platform/:id/update', platform_controller.platform_update_get);

// POST request to update platform.
router.post('/platform/:id/update', platform_controller.platform_update_post);

// GET request for one platform.
router.get('/platform/:id', platform_controller.platform_detail);

// GET request for list of all platforms.
router.get('/platforms', platform_controller.platform_list);

///---------------///
/// GENRE ROUTES ///
///---------------///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

///-----------------------///
/// GAME INSTANCE ROUTES ///
///---------------------///

// GET request for creating a gameInstance. NOTE This must come before route that displays gameInstance (uses id).
router.get(
  '/gameinstance/create',
  game_instance_controller.gameinstance_create_get
);

// POST request for creating gameInstance.
router.post(
  '/gameinstance/create',
  game_instance_controller.gameinstance_create_post
);

// GET request to delete gameInstance.
router.get(
  '/gameinstance/:id/delete',
  game_instance_controller.gameinstance_delete_get
);

// POST request to delete gameInstance.
router.post(
  '/gameinstance/:id/delete',
  game_instance_controller.gameinstance_delete_post
);

// GET request to update gameInstance.
router.get(
  '/gameinstance/:id/update',
  game_instance_controller.gameinstance_update_get
);

// POST request to update gameInstance.
router.post(
  '/gameinstance/:id/update',
  game_instance_controller.gameinstance_update_post
);

// GET request for one gameInstance.
router.get('/gameinstance/:id', game_instance_controller.gameinstance_detail);

// GET request for list of all gameInstance.
router.get('/gameinstances', game_instance_controller.gameinstance_list);
*/
module.exports = router;
