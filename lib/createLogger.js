const config = require("./config");
const winston = require("winston");
const logLevels = require("./logLevels");
const humanFormatter = require("./formatters/humanFormatter");
const jsonFormatter = require("./formatters/jsonFormatter");

const createLogger = function (options) {

    const createLoggerFormat = function () {

        if (config.humanReadable) {
            return humanFormatter(options.namespace);
        }

        return jsonFormatter(options.namespace);
    };

    const createTransportOptions = function () {
        return {
            handleExceptions: true,
            format: createLoggerFormat()
        };
    };

    winston.addColors(logLevels.colours);

    return winston.createLogger({
        level: config.level,
        levels: logLevels.levels,
        transports: [new winston.transports.Console(createTransportOptions())],
        exitOnError: false
    });
};

module.exports = createLogger;
