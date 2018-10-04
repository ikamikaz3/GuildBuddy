const Router = require('koa-router');
const queries = require('../db/queries/guilds');

const router = new Router();
const BASE_URL = `/api/v1/guilds`;

router.get(BASE_URL, async (ctx) => {
    try {
      const guilds = await queries.getAllGuilds();
      ctx.body = {
        status: 'success',
        data: guilds
      };
    } catch (err) {
      console.log(err)
    }
})

module.exports = router;