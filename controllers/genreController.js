/* Dependencies
 *****************************************/
const Genre = require('../models/genre');

// GET list of genres
// Permission: public
// Description: Display a list of genres
exports.genre_list = (req, res, next) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genres) => {
      if (err) return next(err);
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genres
      });
    });
};

// GET details of a genre
// Permission: public
// Description: Display details of a genre
exports.genre_detail = (req, res, next) => {
  Genre.findById(req.params.id)
    .populate('genre')
    .exec((err, detail_genre) => {
      if (err) return next(err);
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre_detail: detail_genre
      });
    });
};

// GET page for creating a genre
// Permission: private (admin only)
// Description: Display create genre form
exports.genre_create_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    res.render('genre_create', {
      title: 'Create genre'
    });
  } else {
    res.render('permission_denied');
  }
};

// POST page for creating a genre
// Permission: private (admin only)
// Description: Post create genre form
exports.genre_create_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    const genre = new Genre({
      name: req.body.name
    });
    genre.save(err =>
      err ? console.error(err) : console.log('Successfully created genre')
    );
    res.redirect('/catalog/genres');
  } else {
    res.render('permission_denied');
  }
};

// GET page for deleting a genre
// Permission: public
// Description: Get delete genre page
exports.genre_delete_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 3) {
    Genre.findById(req.params.id)
      .populate('genre')
      .exec((err, delete_genre) => {
        if (err) return next(err);
        res.render('genre_delete', {
          title: 'Delete Genre',
          genre_delete: delete_genre
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for deleting a genre
// Permission: private (super only)
// Description: Post delete genre form
exports.genre_delete_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 3) {
    Genre.remove({ _id: req.params.id }, err => {
      if (!err) {
        console.log('Successfully deleted genre');
        res.redirect('/catalog/genres');
      } else {
        console.error('Error deleting genre');
        res.redirect('/catalog/genres');
      }
    });
  } else {
    res.render('permission_denied');
  }
};

// GET page for updating a genre
// Permission: private (admin only)
// Description: Get update genre form
exports.genre_update_get = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    Genre.findById(req.params.id)
      .populate('genre')
      .exec((err, detail_genre) => {
        if (err) return next(err);
        res.render('genre_update', {
          title: 'Update genre',
          detail_genre
        });
      });
  } else {
    res.render('permission_denied');
  }
};

// POST page for updating a genre
// Permission: private (admin only)
// Description: Post update genre form
exports.genre_update_post = (req, res) => {
  if (res.locals.currentUser && res.locals.currentUser.accessLevel >= 2) {
    const obj = {
      name: req.body.name
    };
    Genre.findByIdAndUpdate(
      req.params.id,
      obj,
      { new: false },
      (err, genreUpdate) => {
        if (err) {
          console.error(err);
        }
        console.log('Successfully updated genre');
      }
    );
    res.redirect('/catalog/genres');
  } else {
    res.render('permission_denied');
  }
};
