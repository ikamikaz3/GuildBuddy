const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const queries = require('../db/queries/users');

const router = new Router();
const BASE_URL = '/api/v1/auth';

router.post(`${BASE_URL}/login`, async (ctx) => {
  try {
    const user = await queries.getUser(ctx.request.body.username);
    if (user[0].password === ctx.request.body.password) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        token: jwt.sign({id: user.id}, 'super-secret-bruu', { expiresIn: 60 * 5 }),
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Wrong credentials'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Bad request'
    };
  }
});

module.exports = router;
