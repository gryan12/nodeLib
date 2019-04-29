const fs = require('fs');
const path = require('path');

const Selection = require('./selection');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'books.json'
);

const getBooksFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Book {
  constructor(id, title, imageUrl, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    getBooksFromFile(books => {
      if (this.id) {
        const existingBookIndex = books.findIndex(
          prod => prod.id === this.id
        );
        const updatedBooks = [...books];
        updatedBooks[existingBookIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedBooks), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        books.push(this);
        fs.writeFile(p, JSON.stringify(books), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getBooksFromFile(books => {
      const book = books.find(prod => prod.id === id);
      const updatedBooks = books.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedBooks), err => {
        if (!err) {
          Selection.deleteBook(id);
        }
      });
    });
  }

  static fetchAll(cb) {
    getBooksFromFile(cb);
  }

  static findById(id, cb) {
    getBooksFromFile(books => {
      const book = books.find(p => p.id === id);
      cb(book);
    });
  }
};
