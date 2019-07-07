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

// Game routes:
router.get('/game/create', game_controller.game_create_get);
router.get('/games', game_controller.game_list);
router.get('/game/:id', game_controller.game_detail);

router.get('/game/:id/delete', game_controller.game_delete_get);
router.post('/game/:id/delete', game_controller.game_delete_post);

//
router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genres', genre_controller.genre_list);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// Platform routes:
router.get('/platform/create', platform_controller.platform_create_get);
router.post('/platform/create', platform_controller.platform_create_post);
router.get('/platforms', platform_controller.platform_list);
router.get('/platform/:id', platform_controller.platform_detail);
router.get('/platform/:id/delete', platform_controller.platform_delete_get);
router.post('/platform/:id/delete', platform_controller.platform_delete_post);

//router.get('/platform/:id/update', platform_controller.platform_update_get);
//router.post('/platform/:id/update', platform_controller.platform_update_post);
//

// Game instance routes:
router.get(
  '/gameinstance/create',
  game_instance_controller.gameinstance_create_get
);
router.get('/gameinstances', game_instance_controller.gameinstance_list);
router.get('/gameinstance/:id', game_instance_controller.gameinstance_detail);

// POST request for creating game.
//router.post('/game/create', game_controller.game_create_post);

/*


// GET request to update game.
router.get('/game/:id/update', game_controller.game_update_get);

// POST request to update game.
router.post('/game/:id/update', game_controller.game_update_post);





/// PLATFORM ROUTES ///


///---------------///
/// GENRE ROUTES ///
///---------------///





// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);


// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);

///-----------------------///
/// GAME INSTANCE ROUTES ///
///---------------------///



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
