const express = require('express');
const recordsRoutes = express.Router();
const recordsHandlers = require('./record.handlers');

recordsRoutes.post('/', recordsHandlers.addRecord);
recordsRoutes.get('/', recordsHandlers.getRecords);

module.exports = recordsRoutes;