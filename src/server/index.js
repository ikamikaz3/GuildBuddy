const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const indexRoutes = require('./routes/index');
const guildRoutes = require('./routes/guilds');

const app = new Koa();
const logger = new Logger();
const PORT = process.env.PORT || 1337;

app.use(logger);
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(guildRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
