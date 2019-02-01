const chai = require ('chai');

const chaiHttp = require ('chai-http');

chai.use (chaiHttp);

const server = require ('../../src/server/index');

const loginWithDefaultUser = async () =>
  chai.request (server).post ('/api/v1/auth/login').send ({
    username: 'adminUser',
    password: 'password',
  });

module.exports = {
  loginWithDefaultUser,
};
