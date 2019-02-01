/* Http client */
const chai = require ('chai');
const chaiHttp = require ('chai-http');

chai.use (chaiHttp);

/* Server to request */
const server = require ('../src/server/index');

/* Database connections */
const knex = require ('../src/server/db/connection');

/* Login to API helper method */
const helper = require ('./helper/helper');

describe ('routes : users', () => {
  beforeEach (() =>
    knex.migrate
      .rollback ()
      .then (() => knex.migrate.latest ())
      .then (() => knex.seed.run ())
  );

  afterEach (() => knex.migrate.rollback ());

  describe ('GET /api/v1/users', () => {
    it ('should return all users', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .get ('/api/v1/users')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .then (res => {
            res.status.should.eql (200);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.should.have.property ('data');
            res.body.data.should.have.length (2);
            res.body.data[0].should.have.property ('username');
            res.body.data[0].should.have.property ('password');
            res.body.data[0].should.have.property ('role');
          })
      ));
  });

  describe ('GET /api/v1/users/:id', () => {
    it ('should return one user', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .get ('/api/v1/users/1')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .then (res => {
            res.status.should.eql (200);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.should.have.property ('data');
            res.body.data.should.have.property ('username');
            res.body.data.should.have.property ('password');
            res.body.data.should.have.property ('role');
          })
      ));

    it ('should throw an error if id is not found', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .get ('/api/v1/users/1000')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .then (res => {
            res.status.should.eql (404);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('error');
            res.body.should.have.property ('message');
          })
      ));
  });

  describe ('POST /api/v1/users', () => {
    it ('should create a user and return it', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/users')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            username: 'Ally scum',
            password: 'password',
            role: 'user',
          })
          .then (res => {
            res.status.should.eql (201);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.data.should.have.length (1);
            res.body.data[0].should.have.property ('username');
            res.body.data[0].should.have.property ('password');
            res.body.data[0].should.have.property ('role');
          })
      ));

    it ('should throw an error if trying to create user with username already taken', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/users')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            username: 'gBuddyUser',
            password: 'password',
            role: 'user',
          })
          .then (res => {
            res.status.should.eql (400);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('error');
            res.body.should.have.property ('message');
          })
      ));

    it ('should throw an error if payload has extra values', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/users')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            username: 'Ally scum',
            password: 'password',
            role: 'user',
            error: 'error',
          })
          .then (res => {
            res.status.should.eql (400);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('error');
            res.body.should.have.property ('message');
          })
      ));

    it ('should throw an error if payload has missing values', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/users')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            username: 'Ally scum',
            password: 'password',
          })
          .then (res => {
            res.status.should.eql (400);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('error');
            res.body.should.have.property ('message');
          })
      ));
  });
});
