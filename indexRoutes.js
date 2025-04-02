const express = require('express');
const router = require('./routes/empRoutes');
const indexRoute = express();
indexRoute.use('/employee',router);
module.exports = indexRoute;