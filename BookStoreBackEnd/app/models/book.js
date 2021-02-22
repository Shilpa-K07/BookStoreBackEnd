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
const userBucket = require('../../config/dbConfig').userBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const { logger } = config;
//const userModel = require('./user');
class BookModel {
    /**
    * @description saving book into buckets
    * @method insert is used to save book into bucket
    */
    save = async (bookData, callBack) => {
        await userBucket.get(bookData.adminId.toString(), async (error, user) => {
            if (error)
                return callBack(error, null);
            else if (user.length == 0)
                return callBack(null, user);
            else {
                const data = {
                    author: bookData.author,
                    title: bookData.title,
                    image: bookData.image,
                    quantity: bookData.quantity,
                    price: bookData.price,
                    description: bookData.description
                }
                logger.info('creating unique id');
                const id = uuid();
                await bookBucket.insert(id, data, (error, result) => {
                    return error ? callBack(error, null) : callBack(null, result);
                });
            }
        });
    }

    // retrieving books from books bucket
    get = async (userId, callBack) => {
        await userBucket.get(userId.toString(), async (error, user) => {
            if (error)
                return callBack(error, null);
            else if (user.length == 0)
                return callBack(new Error('ERR-401'), null);
            else {
                logger.info('retrieving books');
                await bookBucket.query(
                    N1qlQuery.fromString('SELECT * FROM `books`'), (err, rows) => {
                        return (err) ? callBack(err, null) : callBack(null, rows);
                    });
            }
        });
    }

    // update book in the books bucket
    update = async (bookData, callBack) => {
        await userBucket.get(bookData.adminId.toString(), async (error, user) => {
            if (error)
                return callBack(error, null);
            else if (user.length == 0)
                return callBack(new Error('ERR-401'), null);
            else {
                logger.info('updating book');
                await bookBucket.get(bookData.id, (error, books) => {
                    if (error)
                        return callBack(error, null);
                    else if (books.length == 0)
                        return callBack(null, books);
                    else {
                        const newData = {
                            author: bookData.author,
                            title: bookData.title,
                            image: bookData.image,
                            quantity: bookData.quantity,
                            price: bookData.price,
                            description: bookData.description
                        }
                        bookBucket.upsert(bookData.id, newData, (error, result) => {
                            return error ? callBack(error, null) : callBack(null, result);
                        });
                    }
                });
            }
        });
    }

    // delete book in the books bucket
    delete = async (bookData, callBack) => {
        await userBucket.get(bookData.adminId.toString(), async (error, user) => {
            if (error)
                return callBack(error, null);
            else if (user.length == 0)
                return callBack(new Error('ERR-401'), null);
            else {
                logger.info('deleting book');
                await bookBucket.get(bookData.id, (error, books) => {
                    if (error)
                        return callBack(error, null);
                    else if (books.length == 0)
                        return callBack(null, books);
                    else {
                        bookBucket.remove(bookData.id, bookData, (error, result) => {
                            return error ? callBack(error, null) : callBack(null, result);
                        });
                    }
                });
            }
        });
    }

    // add book to bag
    addToBag = async (bookData, callBack) => {
        await userBucket.get(bookData.userId.toString(), async (error, user) => {
            if (error)
                return callBack(error, null);
            else if (user.length == 0)
                return callBack(new Error('ERR-401'), null);
            else {
                logger.info('adding book to bag');
                await bookBucket.get(bookData.bookId, async (error, books) => {
                    console.log('book: ' + JSON.stringify(books));
                    if (error)
                        return callBack(error, null);
                    else if (books.length == 0 || books.value.quantity < 0)
                        return callBack(books, null);
                    else {
                       /*  const updateData = {
                            userId: bookData.userId
                        } */
                        /*  bookBucket.upsert(bookData.bookId, updateData, (error, result) => {
                             return error ? callBack(error, null) : callBack(null, result);
                         }); */
                         console.log('id: '+bookData.userId);
                         console.log('id: '+bookData.bookId);
                       // var query = N1qlQuery.fromString('UPDATE `books` USE KEYS ' +'"'+bookData.bookId+'"'+'SET userId= '+'"'+bookData.userId+'"');
                       var query = N1qlQuery.fromString('UPDATE `books` USE KEYS ' +'"'+bookData.bookId+'"'+'SET userId=ARRAY_APPEND(userId,'+bookData.userId+')')
                        console.log('query: '+query);
                        //N1qlQuery("UPDATE 'books' USE KEYS "user_2343" SET email = "john.doe@gmail.com" RETURNING email");
                       // 'UPDATE `books` SET userId=' + '"' + bookData.userId + '"' +'WHERE id='+ '"' + bookData.bookId + '"'
                        await bookBucket.query(query, (error, rows) => {console.log('rows: '+JSON.stringify(rows));
                            return (error) ? callBack(error, null) : callBack(null, rows);
                        });
                    }
                })
            }
        })
    }
}
module.exports = new BookModel();