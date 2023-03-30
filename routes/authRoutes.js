const express = require('express');
const router = express.Router();
const { dashboard, completeTask, addTask, deleteTask } = require('../controllers/dashboardControllers');
const { callback, authenticate } = require('../controllers/googleControllers');
const { logout } = require('../controllers/loginControllers')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

// Autenticación con Google
router.get('/google', authenticate);

// Callback de Google para redirigir al usuario después de autenticarse
router.get('/google/callback', callback);

// Ruta de dashboard
router.get('/dashboard', dashboard);

// Ruta de cierre de sesión
router.post('/logout', logout);

// Ruta para agregar tarea
router.post('/addTask', addTask);

// Ruta para marcar tarea completada
router.post('/completeTask', completeTask);

// Ruta para eliminar una tarea
router.post('/deleteTask/:id', deleteTask);

module.exports = router;