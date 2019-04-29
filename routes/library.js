const path = require('path');

const express = require('express');

const libraryController = require('../controllers/library');

const router = express.Router();

router.get('/', libraryController.getIndex);

router.get('/books', libraryController.getBooks);

router.get('/books/:bookId', libraryController.getBook);

router.get('/selection', libraryController.getSelection);

router.post('/selection', libraryController.postSelection);

router.post('/selection-delete-item', libraryController.postSelectionDeleteBook);

router.get('/history', libraryController.getHistory);

router.get('/checkout', libraryController.getCheckout);

module.exports = router;
