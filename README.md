# Vibbra Commerce

## Description
This api aims to distribute data in the e-commerce model your modules are listed below.

## Modules
- Authentication:
    - /login: Authenticate a user by login and password.
    - /logout: Unauthenticates a user logged.
    - /sso: Authenticate a user by token and login name.
- User:
    - create: Register a new user.
    - find: Returns a list of users or a single one by ID.
    - update: Edit a user data by his ID.
- Deals:
    - create: Create a new deal.
    - find: Returns a list of deals or a single one by ID or by his creator user.
    - update: Edit a registerd deal by ID.
- Bids:
    - create: Create a new bid.
    - find: Returns a list of bids or a single one by ID or by his creator user.
    - update: Edit a registered bid by ID.
- Messages:
    - create: Create a new message.
    - find: Returns a list of messages or a single one by ID and his deal related.
    - update: Edit a registered message by ID.
- Invites:
    - create: Create a new invite.
    - find: Returns a list of invites or a single one by ID or by his creator user.
    - update: Edit a registered invite by ID.
- Delivery:
    - find: Returns information about the delivery of the deal product.

## API Docs
[base_url]/api/docs

## Technologies used
- Express
- jsonwebtoken
- mongoose
- swagger

## Build Setup

Note: before the project is run, a .env file must be created with the following variables:
- APP_NAME= // application name
- APP_VERSION= // version of project
- API_URL= // base_url of application
- SECRET= // Use in token generator
- DATABASE_URI= // URI for mongodb database access
- AUTHTOKEN_EXPIRES= // token expiration time

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run start
```