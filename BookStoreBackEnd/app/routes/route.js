/*************************************************************************
* Purpose : to hit APIs
*
* @file : route.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 02/02/2021
*
**************************************************************************/
const user= require('../controllers/user.js');
const book = require('../controllers/book.js');
module.exports = (app) => {
    // register user
    app.post('/registration', user.register);

    // user login
    app.post('/login', user.login);
    
    // add book
    app.post('/book', book.addBook);

    // get books
    app.get('/book', book.getBooks);

    // update books
    app.put('/book/:bookId', book.updateBook);

    // delete books
    app.delete('/book/:bookId', book.deleteBook);
};