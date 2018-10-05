const Router = require('koa-router');
const queries = require('../db/queries/guilds');

const router = new Router();
const BASE_URL = `/api/v1/guilds`;

router.get(BASE_URL, async (ctx) => {
  try {
    const movies = await queries.getAllGuilds();
    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
    const guild = await queries.getSingleGuild(ctx.params.id);
    if (guild.length) {
      ctx.body = {
        status: 'success',
        data: guild
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        type: 'application/json',
        status: 'error',
        message: 'That guild does not exist.'
      };
    }
})

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const guild = await queries.addGuild(ctx.request.body);
    if (guild.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: guild
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.updateGuild(ctx.params.id, ctx.request.body);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const movie = await queries.deleteGuild(ctx.params.id);
    if (movie.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: movie
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That movie does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;
