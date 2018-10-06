process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

const loginWithDefaultUser = async () => chai.request(server)
.post('/api/v1/auth/login')
.send({
  username: 'gBuddyUser',
  password: 'password'
});

describe('routes : movies', () => {

  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());

  describe('GET /api/v1/guilds', () => {
    it('should return all guilds', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .get('/api/v1/guilds')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [3 movie objects]}
          res.body.data.length.should.eql(3);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].should.include.keys(
            'id', 'name'
          );
      })
    ));
  });

  describe('GET /api/v1/movies/:id', () => {
    
    it('should respond with a single movie', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .get('/api/v1/guilds/1')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response sh11ould be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 movie object}
        res.body.data[0].should.include.keys(
          'id', 'name'
        );
      })
    ));

    it('should throw an error if the movie does not exist', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .get('/api/v1/guilds/9999999')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That movie does not exist."}
        res.body.message.should.eql('That guild does not exist.');
      })
    ));
  });

  describe('POST /api/v1/guilds', () => {
    it('should return the guild that was added', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .post('/api/v1/guilds')
      .send({
        name: 'Titanic',
      })
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 guild object}
        res.body.data[0].should.include.keys(
          'id', 'name'
        );
      })
    ));

    it('should throw an error if the payload is malformed', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .post('/api/v1/guilds')
      .send({
        randomShit: "Titanic"
      })
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 400 status code
        res.status.should.equal(400);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a message key
        should.exist(res.body.message);
      })
    ))
  });

  describe('PUT /api/v1/guilds', () => {
    it('should return the guild that was updated', () => loginWithDefaultUser().then(loginRes => knex('guilds')
      .select('*')
      .then(guilds => {
        const guildObject = guilds[0];
        chai.request(server)
        .put(`/api/v1/guilds/${guildObject.id}`)
        .send({
          name: "Topkek"
        })
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        .then(res => {
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 movie object}
          res.body.data[0].should.include.keys(
            'id', 'name'
          );
          // ensure the movie was in fact updated
          const newGuildObject = res.body.data[0];
          newGuildObject.name.should.not.eql(guildObject.name);
        })
      })
    ));

    it('should throw an error if the movie does not exist', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .put('/api/v1/guilds/9999999')
      .send({
        name: "Topkek"
      })
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That movie does not exist."}
        res.body.message.should.eql('That movie does not exist.');
      })
    ))
  });

  describe('DELETE /api/v1/guilds/:id', () => {
    it('should return the guild that was deleted', () => loginWithDefaultUser().then(loginRes => knex('guilds')
      .select('*')
      .then(guilds => {
        const guildObject = guilds[0];
        const lengthBeforeDelete = guilds.length;
        chai.request(server)
        .delete(`/api/v1/guilds/${guildObject.id}`)
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        .then(res => {
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 movie object}
          res.body.data[0].should.include.keys(
            'id', 'name'
          );
          // ensure the movie was in fact deleted
          knex('guilds').select('*')
          .then((updatedGuilds) => {
            updatedGuilds.length.should.eql(lengthBeforeDelete - 1);
          });
        })
      })
    ));

    it('should throw an error if the movie does not exist', () => loginWithDefaultUser().then(loginRes => chai
      .request(server)
      .delete('/api/v1/guilds/9999999')
      .set('Authorization', `Bearer ${loginRes.body.token}`)
      .then(res => {
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That movie does not exist."}
        res.body.message.should.eql('That movie does not exist.');
      })
    ));
  });

});
