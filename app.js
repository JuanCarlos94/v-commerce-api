require('dotenv-safe').config();
const express = require('express');
const routes = require('./src/routes/api');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./src/config/swagger3');
require('./src/config/db');
const cors = require('cors');

app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(routes);

app.listen(process.env.PORT || 3000);

module.exports = app;