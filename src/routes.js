const routes = require('express').Router();

const {
  UserController,
  AuthMiddleware
} = require('./app/controllers');

routes
  .post('/login', UserController.show)
  .post('/user/create', UserController.store)
  .get('/user/:user_id', AuthMiddleware, UserController.index);

module.exports = routes;
