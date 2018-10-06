process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : auth', () => {

  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  afterEach(() => knex.migrate.rollback());
  
  describe('POST /auth/login', () => {
    it('should login the user and respond a json web token', (done) => {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        username: 'gBuddyUser',
        password: 'password'
      })
      .end((err, res) => {
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.token.should.not.eql(null);
        done();
      });
    });
  });

});
