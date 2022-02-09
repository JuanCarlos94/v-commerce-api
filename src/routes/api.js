const { Router } = require('express');
const routes = Router();
const { checkSchema } = require('express-validator');

const AuthorizationMid = require('./../middlewares/AuthorizationMiddleware');
const UserValidator = require('../validators/UserValidator');

const AuthenticationController = require('./../controllers/AuthenticationController');
const UserController = require('./../controllers/UserController');
const DealController = require('./../controllers/DealController');
const BidController = require('./../controllers/BidController');
const MessageController = require('./../controllers/MessageController');
const InviteController = require('./../controllers/InviteController');
const ShippingController = require('./../controllers/ShippingController');

/**
 * Authentication
 */
routes.post('/authenticate', AuthenticationController.authenticate);
routes.post('/sso', AuthenticationController.sso);
routes.post('/logout', AuthenticationController.logout);

/**
 * Users
 */
routes.post('/user', checkSchema(UserValidator), UserController.create);
routes.get('/user/:id?', AuthorizationMid(), UserController.findById);
routes.put('/user/:id', checkSchema(UserValidator), UserController.update);

/**
 * Deals
 */
routes.post('/deal', DealController.create);
routes.get('/deal', DealController.listByUser);
routes.get('/deal/userBids', DealController.listByDealWhereUserBid);
routes.get('/deal/:id', DealController.findById);
routes.put('/deal/:id', DealController.update);
routes.post('/deal/search', DealController.search);

/**
 * Bids
 */
routes.post('/deal/:deal_id/bid', BidController.create);
routes.get('/deal/:deal_id/bid', BidController.findByDealId);
routes.get('/deal/:deal_id/user/bid', BidController.findByDealUserId);
routes.get('/deal/:deal_id/bid/:id', BidController.findById);
routes.put('/deal/:deal_id/bid/:id', BidController.update);
routes.put('/deal/:deal_id/bid/:id/accept', BidController.acceptBid);

/**
 * Messages
 */
routes.post('/deal/:deal_id/message', MessageController.create);
routes.get('/deal/:deal_id/message/:id', MessageController.findById);
routes.get('/deal/:deal_id/message', MessageController.findByDealId);
routes.put('/deal/:deal_id/message/:id', MessageController.update);

/**
 * Shippings
 */
routes.get('/deal/:deal_id/delivery', ShippingController.calculateByDeal);
routes.post('/deal/:deal_id/delivery', ShippingController.calculateByDealAndUser)

/**
 * Invites
 */
routes.post('/user/:user_id/invite', InviteController.create);
routes.get('/user/:user_id/invite/:id', InviteController.findById);
routes.get('/user/:user_id/invite', InviteController.findByUser);
routes.put('/user/:user_id/invite/:id', InviteController.update);

module.exports = routes;