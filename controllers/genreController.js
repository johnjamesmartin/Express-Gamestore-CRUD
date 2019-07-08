const Genre = require('../models/genre');

// Display list of all Genre.
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

// Display detail page for a specific Genre.
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

// Display Genre create form on GET.
exports.genre_create_get = (req, res) => {
  res.render('genre_create', {
    title: 'Create genre'
  });
};

// Handle Genre create on POST.
exports.genre_create_post = (req, res) => {
  const genre = new Genre({
    name: req.body.name
  });
  genre.save(err =>
    err ? console.error(err) : console.log('Successfully created genre')
  );
  res.redirect('/catalog/genres');
};

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  Genre.findById(req.params.id)
    .populate('genre')
    .exec((err, delete_genre) => {
      if (err) return next(err);
      res.render('genre_delete', {
        title: 'Delete Genre',
        genre_delete: delete_genre
      });
    });
};

// Handle Genre delete on POST.
exports.genre_delete_post = (req, res) => {
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
