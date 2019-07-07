const Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function(req, res, next) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_genres) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list_genres
      });
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
  Genre.findById(req.params.id)
    .populate('genre')
    .exec(function(err, detail_genre) {
      if (err) {
        return next(err);
      }
      console.log(detail_genre);
      // Successful, so render
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre_detail: detail_genre
      });
    });
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
  res.render('genre_create', {
    title: 'Create genre'
  });
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
  const genre = new Genre({
    name: req.body.name
  });
  genre.save(err => {
    err ? console.error(err) : console.log('Successfully created genre');
  });
  res.redirect('/catalog/genres');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
  Genre.findById(req.params.id)
    .populate('genre')
    .exec((err, delete_genre) => {
      if (err) {
        return next(err);
      }
      res.render('genre_delete', {
        title: 'Delete Genre',
        genre_delete: delete_genre
      });
    });
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
  Genre.remove({ _id: req.params.id }, err => {
    if (!err) {
      console.log('Successfully deleted genre');
      res.redirect('/catalog/genres');
    } else {
      console.error('Error deleting genre');
      res.redirect('/catalog/genres');
    }
  });
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};
