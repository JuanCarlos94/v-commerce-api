const { Router } = require('express');
const routes = Router();

const AuthorizationMid = require('./../middlewares/AuthorizationMiddleware');
const UserValidator = require('./../middlewares/UserValidator');

const AuthenticationController = require('./../controllers/AuthenticationController');
const UserController = require('./../controllers/UserController');
const DealController = require('./../controllers/DealController');

/**
 * Authentication
 */
routes.post('/authenticate', AuthenticationController.authenticate);
routes.post('/sso', AuthenticationController.sso);

/**
 * Users
 */
routes.post('/users', UserController.create);
routes.get('/users/:id', AuthorizationMid(), UserController.findById);
routes.put('/users/:id', UserController.update);

/**
 * Deals
 */
routes.post('/deals', DealController.create);
routes.get('/deals/:id', DealController.findById);
routes.put('/deals/:id', DealController.update)

module.exports = routes;