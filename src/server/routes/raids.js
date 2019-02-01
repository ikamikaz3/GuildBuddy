const Router = require ('koa-joi-router');
const queries = require ('../db/queries/raids');

const {...Joi} = Router.Joi;

const router = new Router ();
const BASE_URL = '/api/v1/raids';

router.route ({
  method: 'get',
  path: BASE_URL,
  handler: async ctx => {
    try {
      const raids = await queries.getAllRaids ();
      ctx.body = {
        status: 'success',
        data: raids,
      };
    } catch (err) {
      console.log (err);
    }
  },
});

router.route ({
  method: 'get',
  path: `${BASE_URL}/:id`,
  handler: async ctx => {
    const raid = await queries.getSingleRaid (ctx.params.id);
    if (!raid.length) {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That raid does not exists.',
      };
      return;
    }
    ctx.body = {
      status: 'success',
      data: raid,
    };
  },
});

router.route ({
  method: 'post',
  path: BASE_URL,
  validate: {
    type: 'json',
    body: {
      name: Joi.string ().max (25),
    },
  },
  handler: async ctx => {
    try {
      if (ctx.state.user.role !== 'admin') {
        ctx.status = 403;
        ctx.body = {
          status: 'error',
          message: 'Forbidden',
        };
        return;
      }
      const raid = await queries.addRaid (ctx.request.body);
      ctx.body = {
        status: 'success',
        data: raid,
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.',
      };
    }
  },
});

router.route ({
  method: 'put',
  path: `${BASE_URL}/:id`,
  validate: {
    type: 'json',
    body: {
      name: Joi.string ().max (25),
    },
  },
  handler: async ctx => {
    try {
      if (ctx.state.user.role !== 'admin') {
        ctx.status = 403;
        ctx.body = {
          status: 'error',
          message: 'Forbidden',
        };
        return;
      }
      const raid = await queries.updateRaid (ctx.params.id, ctx.request.body);
      if (!raid.length) {
        throw Error ('That raid does not exits');
      }
      ctx.body = {
        status: 'success',
        data: raid,
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.',
      };
    }
  },
});

module.exports = router;
