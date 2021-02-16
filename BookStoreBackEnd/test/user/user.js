/*************************************************************************
* Purpose : to test user APIs
*
* @file : user.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 10/02/2021
*
**************************************************************************/
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
let userData = require('./user-test-samples.json');

describe('Registration', () => {
    it('given proper details should do user registration', () => {
        chai.request(server)
            .post('/registration')
            .send(userData['registration-data'])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //setTimeout(done, 15000);
            });
    });

    it('given im proper name should not do register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(userData['invalid-registration-with-name'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given im proper email should not do register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(userData['invalid-registration-with-email'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given im proper password should not do register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(userData['invalid-registration-with-password'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it('given im proper mobile number should not do register', (done) => {
        chai.request(server)
            .post('/registration')
            .send(userData['invalid-registration-with-phonenumber'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe.only('Login', () => {
    it('given proper details should login', () => {
        chai.request(server)
            .post('/login')
            .send(userData['login-data'])
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //setTimeout(done, 15000);
            });
    });
    it('given improper emailId should not login', (done) => {
        chai.request(server)
            .post('/login')
            .send(userData['invalid-login-emailId'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
    it('given improper passsword should give error', (done) => {
        chai.request(server)
            .post('/login')
            .send(userData['invalid-login-password'])
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
    it('given improper credentials should not login', () => {
        chai.request(server)
            .post('/login')
            .send(userData['unauthorized-login'])
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
            });
    });
})