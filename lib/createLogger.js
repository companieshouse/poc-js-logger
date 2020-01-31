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

    const humanFormatterIgnoredKeys = [
        "message",
        "level"
    ];

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
            return humanFormatter;
        }

        return jsonFormatter;
    };

    const createTransportOptions = function () {
        return {
            level: config.level,
            handleExceptions: true,
            format: createLoggerFormat()
        };
    };

    const logLevels = {
        levels: {
            error: 0,
            info: 1,
            request: 1,
            debug: 2,
            trace: 3
        },
        colours: {
            error: "red",
            info: "yellow",
            request: "cyan",
            debug: "green",
            trace: "blue"
        }
    };

    winston.addColors(logLevels.colours);

    return winston.createLogger({
        levels: logLevels.levels,
        transports: [new winston.transports.Console(createTransportOptions())],
        exitOnError: false
    });
};

module.exports = createLogger;
