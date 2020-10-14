const routes = require('express').Router();

const {
  UserController,
  AuthMiddleware
} = require('./app/controllers');

const { SingIn, SingUp } = require('./app/middlewares/Check');

routes
  .post('/login', SingIn, UserController.show)
  .post('/user/create', SingUp, UserController.store)
  .get('/user/:user_id', AuthMiddleware, UserController.index);

module.exports = routes;
