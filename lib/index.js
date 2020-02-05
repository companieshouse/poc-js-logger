"use strict";

const createMiddleware = require("./createMiddleware");
const createLogger = require("./createLogger");

const chLogger = function (options) {

    const logger = createLogger(options);

    logger.middleware = createMiddleware(logger);

    return logger;
};

module.exports = chLogger;
