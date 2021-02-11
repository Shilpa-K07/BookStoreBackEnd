/*************************************************************************
* Purpose : to configure appication
*
* @file : server.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 02/02/2021
*
**************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// set config
require('./config').set(process.env.NODE_ENV, app);

// get config
const config = require('./config').get();

// require user routes
require('./app/routes/route')(app);

// require swagger-ui and swagger.json
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/lib/api-docs.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


/**
 * @description listen for requests
 * @param config.port is the port on which server is listening
 */
var server = app.listen(config.port, () => {
  console.log('Server is listening on port '+config.port);
});

module.exports = server;