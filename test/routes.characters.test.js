const chai = require ('chai');

const chaiHttp = require ('chai-http');

chai.use (chaiHttp);

const server = require ('../src/server/index');
const knex = require ('../src/server/db/connection');

const helper = require ('./helper/helper');

describe ('route : characters', () => {
  beforeEach (() =>
    knex.migrate
      .rollback ()
      .then (() => knex.migrate.latest ())
      .then (() => knex.seed.run ())
  );

  afterEach (() => knex.migrate.rollback ());

  describe ('GET /api/v1/characters/', () => {
    it ('should return all characters', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .get ('/api/v1/characters')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .then (res => {
            res.status.should.eql (200);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.should.have.property ('data');
            res.body.data.should.have.length (3);
            res.body.data[0].should.have.property ('name');
            res.body.data[0].should.have.property ('class');
            res.body.data[0].should.have.property ('level');
            res.body.data[0].should.have.property ('race');
          })
      ));
  });

  describe ('POST /api/v1/characters/', () => {
    it ('should create a character and return it', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/characters')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            name: 'Ally scum',
            level: 120,
            race: 'Human',
            class: 'Hunter',
          })
          .then (res => {
            res.status.should.eql (201);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.data.should.have.length (1);
            res.body.data[0].should.have.property ('name');
            res.body.data[0].should.have.property ('class');
            res.body.data[0].should.have.property ('level');
            res.body.data[0].should.have.property ('race');
          })
      ));
  });

  describe ('PUT /api/v1/characters/', () => {
    it ('should update a character and return it', () =>
      helper.loginWithDefaultUser ().then (loginRes =>
        chai
          .request (server)
          .post ('/api/v1/characters')
          .set ('Authorization', `Bearer ${loginRes.body.token}`)
          .send ({
            name: 'Ally scum',
            level: 120,
            race: 'Human',
            class: 'Hunter',
          })
          .then (res => {
            res.status.should.eql (201);
            res.type.should.equal ('application/json');
            res.body.status.should.eql ('success');
            res.body.data.should.have.length (1);
            res.body.data[0].should.have.property ('name');
            res.body.data[0].should.have.property ('class');
            res.body.data[0].should.have.property ('level');
            res.body.data[0].should.have.property ('race');
          })
      ));
  });
});
