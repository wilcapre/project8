const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bookRoutes = require('./routes/books.js');

const db = require('./models');
const Book = db.Book; 
const sequelize = require('./models').sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); 

app.use('/static', express.static('public'));

app.set('view engine', 'pug'); 

app.use(bookRoutes); 

//error handler for 404 error
app.use((req, res, next) => {
    const err = new Error('Oh no, there has been a mistake!');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');

});

app.listen(4000, function() {
  
});