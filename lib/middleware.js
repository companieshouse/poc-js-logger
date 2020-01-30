// const morgan = require("morgan");
const logger = require("./logger");

// Object.keys(logger.levels).foreach
// {
//     info: function (message) {
//         logger.info(prepended stuff about the request + message)
//     }
// }

const createMiddleware = function () {

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

    const middleware = [
        // morgan("combined", {
        //     stream: logger.stream,
        //     immediate: true
        // }),
        function (request, response, next) {

            const metaData = {
                path: request.path,
                method: request.method,
                status: response.statusCode,
                // start: this.startTime,
                // end: this.endTime,
                // duration: Math.abs(this.endTime.getTime() - this.startTime.getTime()),
            };

            const curriedLogger = {};
            logLevels.forEach(function (level) {
                curriedLogger[level] = loggerWrapper[level].bind(undefined, metaData);
            });

            request.logger = curriedLogger;

            return next();
        }
    ];

    return middleware;
};

module.exports = createMiddleware();
