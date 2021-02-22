/*************************************************************************
* Purpose : to recieve request from controller and send it to model layer 
    and perform some intermediate business logic
*
* @file : book.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 17/02/2021
*
**************************************************************************/
const bookModel = require('../models/book');
class Bookservice {
    /**
	* @description add new book to book-store
	* @method save is a model class method
	*/
    addBook = (bookData, callBack) => {
        bookModel.save(bookData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }

    /**
	* @description retrieve all the books 
	* @method get is a model class method
	*/
    getBooks = (userId, callBack) => {
        bookModel.get(userId, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }

    /**
	* @description update book with particular id 
	* @method update is a model class method
	*/
    updateBook = (bookData, callBack) => {
        bookModel.update(bookData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }

     /**
	* @description update book with particular id 
	* @method update is a model class method
	*/
    deleteBook = (bookData, callBack) => {
        bookModel.delete(bookData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }

    /**
	* @description add to book to bg
	* @method addToBag is a model class method
	*/
    addToBag = (bookData, callBack) => {
        bookModel.addToBag(bookData, (error, data) => {
            return (error) ? callBack(error, null) : callBack(null, data);
        });
    }
}

module.exports = new Bookservice();