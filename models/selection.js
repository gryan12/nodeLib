const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'selection.json'
);

module.exports = class Selection {
  static addBook(id) {
    fs.readFile(p, (err, fileContent) => {
      let selection = { books: []};
      if (!err) {
        selection = JSON.parse(fileContent);
      }
      const existingBookIndex = selection.books.findIndex(
        prod => prod.id === id
      );
      const existingBook = selection.books[existingBookIndex];
      let updatedBook;
      if (existingBook) {
        updatedBook = { ...existingBook };
        updatedBook.qty = updatedBook.qty + 1;
        selection.books = [...selection.books];
        selection.books[existingBookIndex] = updatedBook;
      } else {
        updatedBook = { id: id, qty: 1 };
        selection.books = [...selection.books, updatedBook];
      }
      fs.writeFile(p, JSON.stringify(selection), err => {
        console.log(err);
      });
    });
  }

  static deleteBook(id) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedSelection = { ...JSON.parse(fileContent) };
      const book = updatedSelection.books.find(prod => prod.id === id);
      if (!book) {
          return;
      }
      const bookQty = book.qty;
      updatedSelection.books = updatedSelection.books.filter(
        prod => prod.id !== id
      );
      fs.writeFile(p, JSON.stringify(updatedSelection), err => {
        console.log(err);
      });
    });
  }

  static getSelection(cb) {
    fs.readFile(p, (err, fileContent) => {
      const selection = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(selection);
      }
    });
  }
};
