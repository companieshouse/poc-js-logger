const createMiddleware = require("./lib/createMiddleware");
const createLogger = require("./lib/createLogger");

const chLogger = function (options) {

    const logger = createLogger(options);

    logger.middleware = createMiddleware(logger);

    return logger;
};

module.exports = chLogger;
