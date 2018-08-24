process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Things', () => {
  const testId = Math.floor(Math.random() * 10000000 + 10000000);

  describe('/GET things', () => {
      it('it should GET all the things', (done) => {
        chai.request(server)
            .get('/things')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });

  describe('/POST thing', () => {
      it('it should POST one thing', (done) => {
        const testThing = {
          id: testId,
          name: 'test_thing',
          amount: 0
        }
        chai.request(server)
            .post('/things')
            .send(testThing)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

  describe('/GET/:id things', () => {
      it('it should GET single thing with given id', (done) => {
        chai.request(server)
            .get('/things/' + testId)
            .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('id').eql(testId);
               res.body.should.have.property('name');
               res.body.should.have.property('amount');
              done();
            });
      });
  });

  describe('/PUT/:id thing', () => {
    it('it should UPDATE a thing with given id', (done) => {
      const testThing = {
        amount: 10
      }
      chai.request(server)
          .put('/things/' + testId)
          .send(testThing)
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
    });
  });

  describe('/DELETE/:id thing', () => {
    it('it should DELETE a thing with given id', (done) => {
      chai.request(server)
          .delete('/things/' + testId)
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
    });
  });
});
