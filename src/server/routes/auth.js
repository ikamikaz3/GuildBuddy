const Router = require ('koa-joi-router');
const jwt = require ('jsonwebtoken');
const queries = require ('../db/queries/users');

const {...Joi} = Router.Joi;

const router = new Router ();
const BASE_URL = '/api/v1/auth';

router.route ({
  method: 'post',
  path: `${BASE_URL}/login`,
  validate: {
    type: 'json',
    body: {
      username: Joi.string ().max (15),
      password: Joi.string ().max (15),
    },
  },
  handler: async ctx => {
    try {
      const user = await queries.getUser (ctx.request.body.username);
      if (user[0].password === ctx.request.body.password) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          token: jwt.sign (
            {id: user[0].id, role: user[0].role},
            process.env.API_SECRET_KEY,
            {
              expiresIn: '2h',
            }
          ),
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Wrong credentials',
        };
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Bad request',
      };
    }
  },
});

router.route ({
  method: 'post',
  path: `${BASE_URL}/register`,
  validate: {
    type: 'json',
    body: {
      username: Joi.string ().max (15),
      password: Joi.string ().max (15),
    },
  },
  handler: async ctx => {
    try {
      /* Add default role */
      ctx.request.body = {...ctx.request.body, role: 'user'};

      const user = await queries.addUser (ctx.request.body);
      if (!user.length) {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Bad request',
        };
      }
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: user[0],
      };
    } catch (err) {
      console.log (err);
    }
  },
});

module.exports = router;
