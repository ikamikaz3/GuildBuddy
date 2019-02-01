/* Koa Router and Joi Validator */
const Router = require ('koa-joi-router');

const {...Joi} = Router.Joi;
const router = new Router ();

/* Custom Exception Class */
const ApiError = require ('../exceptions/ApiError');

/* Knex database queries */
const queries = require ('../db/queries/users');

/* Endpoint for this entity */
const BASE_URL = '/api/v1/users';

/* GET /users -> GET_ALL */
router.route ({
  method: 'get',
  path: BASE_URL,
  handler: async ctx => {
    try {
      const users = await queries.getAllUsers ();
      ctx.body = {
        status: 'success',
        data: users,
      };
    } catch (err) {
      if (err instanceof ApiError) ctx.status = err.status;
      else ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    }
  },
});

/* GET /users/id -> GET_ONE */
router.route ({
  method: 'get',
  path: `${BASE_URL}/:id`,
  handler: async ctx => {
    try {
      const user = await queries.getSingleUser (ctx.params.id);
      if (!user.length) throw new ApiError (404, 'That user does not exists.');
      ctx.body = {
        status: 'success',
        data: user[0],
      };
    } catch (err) {
      if (err instanceof ApiError) ctx.status = err.status;
      else ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    }
  },
});

/* POST /users -> CREATE_ONE */
router.route ({
  method: 'post',
  path: BASE_URL,
  validate: {
    type: 'json',
    body: {
      username: Joi.string ().max (25),
      password: Joi.string ().max (25),
      role: Joi.string ().max (25),
    },
  },
  handler: async ctx => {
    try {
      if (ctx.state.user.role !== 'admin')
        throw new ApiError (403, 'Forbidden');
      const users = await queries.addUser (ctx.request.body);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: users,
      };
    } catch (err) {
      if (err instanceof ApiError) ctx.status = err.status;
      else ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    }
  },
});

/* PUT /users -> UPDATE_ONE */
router.route ({
  method: 'put',
  path: `${BASE_URL}/:id`,
  validate: {
    type: 'json',
    body: {
      username: Joi.string ().max (25),
      password: Joi.string ().max (25),
    },
  },
  handler: async ctx => {
    try {
      if (
        parseInt (ctx.params.id, 10) !== ctx.state.user.id &&
        ctx.state.user.role !== 'admin'
      )
        throw new ApiError (403, 'Forbidden');
      const user = await queries.updateUser (ctx.params.id, ctx.request.body);
      if (!user.length) throw new ApiError (404, 'That user does not exists.');
      ctx.body = {
        status: 'success',
        data: user,
      };
    } catch (err) {
      if (err instanceof ApiError) ctx.status = err.status;
      else ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    }
  },
});

/* DELETE /users/id -> DELETE_ONE */
router.route ({
  method: 'delete',
  path: `${BASE_URL}/:id`,
  handler: async ctx => {
    try {
      if (ctx.state.user.role !== 'admin')
        throw new ApiError (403, 'Forbidden');
      const user = await queries.deleteUser (ctx.params.id);
      if (!user.length) throw new ApiError (404, 'That user does not exists.');
      ctx.body = {
        status: 'success',
        data: user,
      };
    } catch (err) {
      if (err instanceof ApiError) ctx.status = err.status;
      else ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    }
  },
});

module.exports = router;
