const Koa = require ('koa');
const Logger = require ('koa-logger');
const dotenv = require ('dotenv');
const KoaJwt = require ('koa-jwt');
const guildRoutes = require ('./routes/guilds');
const authRoutes = require ('./routes/auth');
const userRoutes = require ('./routes/users');
const characterRoutes = require ('./routes/characters');
const raidRoutes = require ('./routes/raids');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load ();
}

const app = new Koa ();
const logger = new Logger ();
const PORT = process.env.PORT || 3000;

// Logger middleware
if (process.env.NODE_ENV === 'development') app.use (logger);

// Custom 401 handling (first middleware)

// error handler, required as of 0.3.0
app.use ((ctx, next) =>
  next ().catch (err => {
    if (err.status === 400) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  })
);

app.use ((ctx, next) =>
  next ().catch (err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  })
);

app.use (authRoutes.middleware ());

// Protect rest of the routes with Json Web Token
app.use (
  KoaJwt ({
    secret: process.env.API_SECRET_KEY,
  })
);

// My API Routes
app.use (guildRoutes.middleware ());
app.use (userRoutes.middleware ());
app.use (characterRoutes.middleware ());
app.use (raidRoutes.middleware ());

const server = app.listen (PORT, () => {
  console.log (`Server listening on port: ${PORT}`);
});

module.exports = server;
