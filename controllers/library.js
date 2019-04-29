const Book = require('../models/book');
const Selection = require('../models/selection');

exports.getBooks = (req, res, next) => {
  Book.fetchAll(books => {
    res.render('library/book-list', {
      prods: books,
      pageTitle: 'All Books',
      path: '/books'
    });
  });
};

exports.getBook = (req, res, next) => {
  const prodId = req.params.bookId;
  Book.findById(prodId, book => {
    res.render('library/book-detail', {
      book: book,
      pageTitle: book.title,
      path: '/books'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Book.fetchAll(books => {
    res.render('library/index', {
      prods: books,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getSelection = (req, res, next) => {
  Selection.getSelection(selection => {
    Book.fetchAll(books => {
      const selectionBooks = [];
      for (book of books) {
        const selectionBookData = selection.books.find(
          prod => prod.id === book.id
        );
        if (selectionBookData) {
          selectionBooks.push({ bookData: book, qty: selectionBookData.qty });
        }
      }
      res.render('library/selection', {
        path: '/selection',
        pageTitle: 'Your Selection',
        books: selectionBooks
      });
    });
  });
};

exports.postSelection = (req, res, next) => {
  const prodId = req.body.bookId;
  Book.findById(prodId, book => {
    Selection.addBook(prodId);
  });
  res.redirect('/selection');
};

exports.postSelectionDeleteBook = (req, res, next) => {
  const prodId = req.body.bookId;
  Book.findById(prodId, book => {
    Selection.deleteBook(prodId);
    res.redirect('/selection');
  });
};

exports.getHistory = (req, res, next) => {
  res.render('library/history', {
    path: '/history',
    pageTitle: 'Renting History'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('library/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
