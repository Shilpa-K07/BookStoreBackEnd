/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : book.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 17/02/2021
*
**************************************************************************/
const bookService = require('../services/book.js');
const validator = require('../utility/inputValidator').book;
const config = require('../../config').get();
const { logger } = config;

class BookController {
    /**
	* @description add new book to book-store
	* @method register is a service class method
	* @method validate validates inputs using Joi
	*/
    addBook = (req, res) => {
        try{
            const bookData = {
				author: req.body.author,
				title: req.body.title,
				image: req.body.image,
				quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description
			};
            const validationResult = validator.validate(bookData);
			if (validationResult.error) {
				return res.status(400).send({ success: false, message: validationResult.error.message });
			}
            bookService.addBook(bookData, (error, data) => {
                if(error) {
                    logger.error(error.message);
                    return res.status(500).send({ success: false, message: error.message });
                }
                logger.info('added book!');
                return res.status(200).send({ success: true, message: 'added book !'});
            });
        }
        catch(error) {
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }

    /**
	* @description retrieve all the books
	* @method getBooks is a service class method
	*/
    getBooks = (req, res) => {
        try{
            bookService.getBooks((error, data) => {
                if(error) {
                    logger.error(error.message);
                    return res.status(500).send({ success: false, message: error.message });
                }
                else if(data.length == 0){
                    logger.error('Books not found');
                    return res.status(404).send({ success: false, message: 'Books not found' });
                }
                logger.info('Successfully retrieved books !');
                return res.status(200).send({ success: true, message: 'Successfully retrieved books !', data: data});
            });
        }
        catch(error){
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }

    /**
     * @description Update book
     */
    updateBook = (req, res) => {
        try {
            const bookData = {
                id: req.params.bookId,
				author: req.body.author,
				title: req.body.title,
				image: req.body.image,
				quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description
			};
            const validationResult = validator.validate(bookData);
			if (validationResult.error) {
				return res.status(400).send({ success: false, message: validationResult.error.message });
			}
            bookService.updateBook(bookData, (error, data) => {
                if(error) {
                    logger.error(error.message);
                    return res.status(500).send({ success: false, message: error.message });
                }
                else if(data.length == 0) {
                    logger.error('Book not found');
                    return res.status(404).send({ success: false, message: 'Book not found' });
                }
                logger.info('updated book!');
                return res.status(200).send({ success: true, message: 'updated book !'});
            });
        }
        catch(error) {
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }

        /**
     * @description Update book
     */
    deleteBook = (req, res) => {
        try {
            const bookData = {
                id: req.params.bookId
			};
            
            bookService.deleteBook(bookData, (error, data) => {
                if(error) {
                    logger.error(error.message);
                    return res.status(500).send({ success: false, message: error.message });
                }
                else if(data.length == 0) {
                    logger.error('Book not found');
                    return res.status(404).send({ success: false, message: 'Book not found' });
                }
                logger.info('deleted book!');
                return res.status(200).send({ success: true, message: 'deleted book !'});
            });
        }
        catch(error) {
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }
}

module.exports = new BookController();