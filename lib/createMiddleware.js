const onFinished = require("on-finished");

const createMiddleware = function (logger) {

    let loggerWrapper = {};

    const createLoggerWrapper = function (level) {
        return function (metaData, message) {
            logger[level](message, metaData);
        };
    };

    const logLevels = Object.keys(logger.levels);

    logLevels.forEach(function (level) {
        loggerWrapper[level] = createLoggerWrapper(level);
    });

    const middleware = function (request, response, next) {

        const startTime = Date.now();

        const metaData = {
            path: request.path,
            method: request.method
        };

        logger.info("Start of request", metaData);

        const applicationLogger = {};
        logLevels.forEach(function (level) {
            applicationLogger[level] = loggerWrapper[level].bind(undefined, metaData);
        });

        request.logger = applicationLogger;

        onFinished(response, function () {

            const duration = Date.now() - startTime;

            const finalMetaData = Object.assign(metaData, {
                status: response.statusCode,
                duration : duration
            });

            logger.info("End of request", finalMetaData);
        });

        return next();
    };

    return middleware;
};

module.exports = createMiddleware;
