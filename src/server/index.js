const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const KoaJwt = require('koa-jwt');
const guildRoutes = require('./routes/guilds');
const authRoutes = require('./routes/auth');

const app = new Koa();
const logger = new Logger();
const PORT = process.env.PORT || 1337;

// Logger middleware
app.use(logger);

// Koa-related middlewares
app.use(bodyParser());

app.use(authRoutes.routes());

// Protect rest of the routes with Json Web Token
app.use(KoaJwt({
  secret: 'super-secret-bruu'
}));

// My API Routes
app.use(guildRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
