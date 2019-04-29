const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render('admin/edit-book', {
    pageTitle: 'Add Book',
    path: '/admin/add-book',
    editing: false
  });
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const book = new Book(null, title, imageUrl, description);
  book.save();
  res.redirect('/');
};

exports.getEditBook = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.bookId;
  Book.findById(prodId, book => {
    if (!book) {
      return res.redirect('/');
    }
    res.render('admin/edit-book', {
      pageTitle: 'Edit Book',
      path: '/admin/edit-book',
      editing: editMode,
      book: book
    });
  });
};

exports.postEditBook = (req, res, next) => {
  const prodId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedBook = new Book(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedBook.save();
  res.redirect('/admin/books');
};

exports.getBooks = (req, res, next) => {
  Book.fetchAll(books => {
    res.render('admin/books', {
      prods: books,
      pageTitle: 'Admin Books',
      path: '/admin/books'
    });
  });
};

exports.postDeleteBook = (req, res, next) => {
  const prodId = req.body.bookId;
  Book.deleteById(prodId);
  res.redirect('/admin/books');
};
