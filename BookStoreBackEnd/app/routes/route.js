/*************************************************************************
* Purpose : to hit APIs
*
* @file : route.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 02/02/2021
*
**************************************************************************/
const user= require('../controllers/user');
const book = require('../controllers/book');
const util = require('../utility/util');
module.exports = (app) => {
    // register user
    app.post('/userRegistration', util.addRole('User'), user.register);

    // register admin
    app.post('/adminRegistration', util.addRole('Admin'), user.register);

    // user login
    app.post('/login', user.login);
    
    // add book
    app.post('/book', util.verifyRole, book.addBook);

    // get books
    app.get('/book', util.verifyToken, book.getBooks);

    // update books
    app.put('/book/:bookId', util.verifyRole, book.updateBook);

    // delete books
    app.delete('/book/:bookId', util.verifyRole, book.deleteBook);
};