const Router = require ('koa-joi-router');
const queries = require ('../db/queries/characters');

const {...Joi} = Router.Joi;

const router = new Router ();
const BASE_URL = '/api/v1/characters';

router.route ({
  method: 'get',
  path: BASE_URL,
  handler: async ctx => {
    try {
      const characters = await queries.getAllCharacters ();
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: characters,
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
    const character = await queries.getSingleCharacter (ctx.params.id);
    if (character.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: character,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That character does not exists.',
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
      name: Joi.string ().max (15),
      level: Joi.number ().integer (),
      class: Joi.string ().max (15),
      race: Joi.string ().max (15),
    },
  },
  handler: async ctx => {
    try {
      const character = await queries.addCharacter (ctx.request.body);
      if (!character) {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Bad request',
        };
      }
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: character,
      };
    } catch (err) {
      console.log (err);
    }
  },
});

router.route ({
  method: 'put',
  path: `${BASE_URL}/:id`,
  validate: {
    type: 'json',
    body: {
      name: Joi.string ().max (15),
      level: Joi.number ().integer (),
      class: Joi.string ().max (15),
      race: Joi.string ().max (15),
    },
  },
  handler: async ctx => {
    const character = await queries.updateCharacter (
      ctx.params.id,
      ctx.request.body
    );
    if (character.length) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Bad request',
      };
    }
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: character,
    };
  },
});

router.route ({
  method: 'delete',
  path: `${BASE_URL}/:id`,
  handler: async ctx => {
    const character = await queries.deleteCharacter (
      ctx.params.id,
      ctx.request.body
    );
    if (!character.length) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Bad request',
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: character,
    };
  },
});

module.exports = router;
