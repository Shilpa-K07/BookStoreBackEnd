/*************************************************************************
* Purpose : to recieve request from service layer and then query DB
*
* @file : book.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 17/02/2021
*
**************************************************************************/
const bookBucket = require('../../config/dbConfig').bookBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const { logger } = config;

class BookModel {
    /**
    * @description saving book into buckets
    * @method insert is used to save book into bucket
    */
    save = async (bookData, callBack) => {
        logger.info('creating unique id');
        const id = uuid();
        await bookBucket.insert(id, bookData, (error, result) => {
            return error ? callBack(error, null) : callBack(null, result);
        });
    }

    // retrieving books from books bucket
    get = async (callBack) => {
        logger.info('retrieving books');
        await bookBucket.query(
            N1qlQuery.fromString('SELECT * FROM `books`'), (err, rows) => {
                return (err) ? callBack(err, null) : callBack(null, rows);
            });
    }

     // update book in the books bucket
     update = async (bookData, callBack) => {
        logger.info('updating book');
          await bookBucket.upsert( bookData.id , bookData, (error, books) => {
            if(error)
                return callBack(error, null);
            else if(books.length == 0)
                return callBack(null, books);
            else
                bookBucket.upsert( bookData.id , bookData, (error, result) => {
                    return error ? callBack(error, null) : callBack(null, result);
                    });
            });
    }
}
module.exports = new BookModel();