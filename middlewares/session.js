const session = require('express-session');

const sessionMiddleware = session({
  secret: '2901',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000 // Duración de la sesión en milisegundos
  }
});

module.exports = sessionMiddleware;