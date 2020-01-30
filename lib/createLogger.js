const config = require("./config");
const winston = require("winston");

const createLogger = function (options) {

    const jsonFormatter = winston.format.printf(function (info) {

        const message = {
            created: (new Date()).toISOString(),
            event: info.level,
            namespace: options.namespace,
            data: {
                message: info.message,
                path: info.path,
                method: info.method,
                status: info.status,
                duration: info.duration
            }
        };

        return JSON.stringify(message);
    });

    const humanFormatter = winston.format.printf(function (info) {

        const keys = Object.keys(info);

        info.created = (new Date()).toISOString();

        let message = `${info.created} ${info.level} ${info.message}`;
        keys.forEach(function (key) {
            message += `\n  -> ${key}: ${info[key]}`;
        });

        return message;
    });

    const createLoggerFormat = function () {

        if (config.humanReadable) {
            return {
                // format: winston.format.combine(
                //     winston.format.colorize(),
                //     winston.format.simple()
                // )
                format: humanFormatter
            };
        }

        return {
            colorize: false,
            // format: winston.format.json()
            format: jsonFormatter
        };
    };

    const createTransportOptions = function () {
        return Object.assign({
            level: config.level,
            handleExceptions: true
        }, createLoggerFormat());
    };

    return winston.createLogger({
        transports: [
            new winston.transports.Console(createTransportOptions())
        ],
        exitOnError: false
    });
};

module.exports = createLogger;
