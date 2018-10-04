var Koa = require('koa');
var app = new Koa();

const indexRoutes = require('./routes/routes');
const guildRoutes = require('./routes/guilds')

app
  .use(indexRoutes.routes())
  .use(indexRoutes.allowedMethods())
  .use(guildRoutes.routes())
  .use(guildRoutes.allowedMethods());

module.exports = app.listen(3000);
console.log("App up and running on localhost:3000/");