const Router = require ('koa-joi-router');
const queries = require ('../db/queries/guilds');

const {...Joi} = Router.Joi;

const router = new Router ();
const BASE_URL = '/api/v1/guilds';

router.route ({
  method: 'get',
  path: BASE_URL,
  handler: async ctx => {
    try {
      const guilds = await queries.getAllGuilds ();
      ctx.body = {
        status: 'success',
        data: guilds,
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
    const guild = await queries.getSingleGuild (ctx.params.id);
    if (guild.length) {
      ctx.body = {
        status: 'success',
        data: guild,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        type: 'application/json',
        status: 'error',
        message: 'That guild does not exist.',
      };
    }
  },
});

router.route ({
  method: 'post',
  path: BASE_URL,
  validate: {
    type: 'json',
    body: {
      name: Joi.string ().max (30),
    },
  },
  handler: async ctx => {
    try {
      const guild = await queries.addGuild (ctx.request.body);
      if (guild.length) {
        ctx.status = 201;
        ctx.body = {
          status: 'success',
          data: guild,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Something went wrong.',
        };
      }
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
      name: Joi.string ().max (30),
    },
  },
  handler: async ctx => {
    try {
      const guild = await queries.updateGuild (ctx.params.id, ctx.request.body);
      if (guild.length) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: guild,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That guild does not exist.',
        };
      }
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
  method: 'delete',
  path: `${BASE_URL}/:id`,
  handler: async ctx => {
    try {
      const guild = await queries.deleteGuild (ctx.params.id);
      if (guild.length) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: guild,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That guild does not exist.',
        };
      }
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
