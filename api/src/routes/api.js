const { Router } = require('express');
const routes = Router();

const AuthorizationMid = require('./../middlewares/AuthorizationMiddleware');
const UserValidator = require('./../middlewares/UserValidator');

const AuthenticationController = require('./../controllers/AuthenticationController');
const UserController = require('./../controllers/UserController');
const DealController = require('./../controllers/DealController');
const BidController = require('./../controllers/BidController');
const MessageController = require('./../controllers/MessageController');
const InviteController = require('./../controllers/InviteController');

/**
 * Authentication
 */
routes.post('/authenticate', AuthenticationController.authenticate);
routes.post('/sso', AuthenticationController.sso);

/**
 * Users
 */
routes.post('/user', UserController.create);
routes.get('/user/:id', AuthorizationMid(), UserController.findById);
routes.put('/user/:id', UserController.update);

/**
 * Deals
 */
routes.post('/deal', DealController.create);
routes.get('/deal/:id', DealController.findById);
routes.put('/deal/:id', DealController.update);
routes.post('/deal/search', DealController.search);

routes.post('/deal/:deal_id/bid', BidController.create);
routes.get('/deal/:deal_id/bid/:id', BidController.findById);
routes.get('/deal/:deal_id/bid', BidController.findByDealId);
routes.put('/deal/:deal_id/bid/:id', BidController.update);

/**
 * Messages
 */
routes.post('/deal/:deal_id/message', MessageController.create);
routes.get('/deal/:deal_id/message/:id', MessageController.findById);
routes.get('/deal/:deal_id/message', MessageController.findByDealId);
routes.put('/deal/:deal_id/message/:id', MessageController.update);

/**
 * Invites
 */
routes.post('/user/:user_id/invite', InviteController.create);
routes.get('/user/:user_id/invite/:id', InviteController.findById);
routes.get('/user/:user_id/invite', InviteController.findByUser);
routes.put('/user/:user_id/invite', InviteController.update);

module.exports = routes;