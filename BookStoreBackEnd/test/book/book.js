/*************************************************************************
* Purpose : to test book APIs
*
* @file : boook.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 18/02/2021
*
**************************************************************************/
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
let bookData = require('./book-test-samples.json');

describe('/POST add book', () => {
    it('given proper data should add book', (done) => {
        let token = bookData['valid-token'];
        chai.request(server)
            .post('/book')
            .send(bookData['book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given empty title or price or quantity or image should not add book', (done) => {
        let token = bookData['valid-token'];
        chai.request(server)
            .post('/book')
            .send(bookData['invalid-book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given invalid token should not add book', (done) => {
        let token = bookData['invalid-token'];
        chai.request(server)
            .post('/book')
            .send(bookData['book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
})

describe('/GET get books', () => {
    it('given proper request should returns all the books', (done) => {
        let token = bookData['valid-token'];
        chai.request(server)
            .get('/book')
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given invalid token should returns all the books', (done) => {
        let token = bookData['invalid-token'];
        chai.request(server)
            .get('/book')
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
})


describe('/PUT update books', () => {
    it('given proper input should update book', (done) => {
        let bookId = bookData['book-id']['id-to-update'];
        let token = bookData['valid-token'];
        chai.request(server)
            .put('/book/' + bookId)
            .send(bookData['book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given improper data should not update book', (done) => {
        let bookId = bookData['book-id']['id-to-update'];
        let token = bookData['valid-token'];
        chai.request(server)
            .put('/book/' + bookId)
            .send(bookData['invalid-book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given invalid token should update book', (done) => {
        let bookId = bookData['book-id']['id-to-update'];
        let token = bookData['invalid-token'];
        chai.request(server)
            .put('/book/' + bookId)
            .send(bookData['book-data'])
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });
})

describe('/DELETE books', () => {
    it('given non-exists id should give give book not found error', (done) => {
        let bookId = bookData['book-id']['non-exist-id'];
        let token = bookData['valid-token'];
        chai.request(server)
            .delete('/book/' + bookId)
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given invalid token should not delete book', (done) => {
        let bookId = bookData['book-id']['id-to-delete'];
        let token = bookData['invalid-token'];
        chai.request(server)
            .delete('/book/' + bookId)
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given proper input should delete book', (done) => {
        let bookId = bookData['book-id']['id-to-delete'];
        let token = bookData['valid-token'];
        chai.request(server)
            .delete('/book/' + bookId)
            .set('token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
})