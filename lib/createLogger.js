const config = require("./config");
const winston = require("winston");

const createLogger = function (options) {

    const colorizer = winston.format.colorize();

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

    const humanFormatterIgnoredKeys = ["message", "level"];
    const humanFormatter = winston.format.printf(function (info) {

        info.created = (new Date()).toISOString();
        const keys = Object.keys(info).sort();

        let message = colorizer.colorize(info.level, `${info.created} ${info.level}: ${info.message}`);
        keys.forEach(function (key) {
            if (info[key] !== undefined && !humanFormatterIgnoredKeys.includes(key)) {
                message += `\n  -> ${key}: ${info[key]}`;
            }
        });

        return message;
    });

    const createLoggerFormat = function () {

        if (config.humanReadable) {
            return {
                format: humanFormatter
            };
        }

        return {
            colorize: false,
            format: jsonFormatter
        };
    };

    const createTransportOptions = function () {
        return Object.assign({
            level: config.level,
            handleExceptions: true
        }, createLoggerFormat());
    };
    
    const logLevels = {
        levels: {
            request: 0,
            error: 1,
            info: 2,
            debug: 3,
            trace: 4
        },
        colours: {
            request: "cyan",
            error: "red",
            info: "yellow",
            debug: "green",
            trace: "blue"
        }
    };

    winston.addColors(logLevels.colours);

    return winston.createLogger({
        levels: logLevels.levels,
        transports: [
            new winston.transports.Console(createTransportOptions())
        ],
        exitOnError: false
    });
};

module.exports = createLogger;
