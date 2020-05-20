const routes = require('express').Router();

const UserController = require('./app/controllers/UserController');
const AuthMiddleware = require('./app/middlewares/Auth');

routes
  .post('/login', UserController.show)
  .post('/user/create', UserController.store)
  .get('/user/:user_id', AuthMiddleware, UserController.index);

module.exports = routes;
