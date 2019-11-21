const express = require('express');
const router = express.Router();
const Book = require ('../models').Book;

/* Get books listing*/
router.get('/', async (req, res) => {
/* Reorder in descending order  */
  const books = await Book.findAll({order: [["createdAt", "DESC"]] });  
  res.render("index", {books});
});

/* Get books */
router.get('/books', async (req, res) => {
    /* Reorder in descending order  */
      const books = await Book.findAll({order: [["createdAt", "DESC"]] });  
      res.render("index", {books});
    });

/* Create new books form. */
router.get('/books/new', (req, res) => {
    res.render("new-book");
});

/* Post create new books. */
router.post('/books', async(req, res) => { 
    try {
      const book = await Book.create(req.body);
      res.redirect("/books");
    } catch(error) {
        if (error.name === 'SequelizeValidationError') {
          const errorMessages = error.errors.map(error => (error)); 
          res.render("new-book", { errorMessages }) 
        }
    }
});

/* Get individual book. */
router.get("/books/:id", async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book){
    res.render("update-book", {book});
    } else {
        res.render("page-not-found");
    }
});

/* Update a booK. */
router.post('/books/:id/edit', async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  try {
    if(book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id);
    } else {
      res.render("page-not-found"); 
    }
  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map(error => (error)); 
      res.render("update-book", { book, errorMessages }) 
    }
  }
});

/* Delete books form */
router.post("/books/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy(); 
    res.redirect("/books");
  } else {
    res.render("page-not-found");
  }
});

module.exports = router; 