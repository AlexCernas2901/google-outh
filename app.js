const express = require('express');
const app = express();
const passport = require('./config/passport-config');
const authRoutes = require('./routes/authRoutes');
const sessionMiddleware = require('./middlewares/session');
const { login } = require('./controllers/loginControllers');
require('ejs')

// Declarando el motor de vistas
app.set('view engine', 'ejs');

// Declarando la ruta raiz de la aplicacion
app.get('/', login);

// Configura la sesión
app.use(sessionMiddleware);

// Inicializa Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configura las rutas de autenticación
app.use('/auth', authRoutes);

// Levantando servidor
app.listen(3000, () => {
  console.log('SERVER RUNNING ON PORT 3000');
});