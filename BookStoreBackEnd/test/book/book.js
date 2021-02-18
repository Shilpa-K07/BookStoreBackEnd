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
        chai.request(server)
            .post('/book')
            .send(bookData.addBook)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given empty title or price or quantity or image should not add book', (done) => {
        chai.request(server)
            .post('/book')
            .send(bookData.addBook)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given improper author name should not add book', (done) => {
        chai.request(server)
            .post('/book')
            .send(bookData.addBook)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
})

describe('/GET get books', () => {
    it('given proper request should returns all the books', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
})
