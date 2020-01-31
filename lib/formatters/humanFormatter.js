const winston = require("winston");

const humanFormatter = function (namespace) {

    const colorizer = winston.format.colorize();

    const ignoredKeys = [
        "message",
        "level"
    ];

    return winston.format.printf(function (info) {

        info.created = (new Date()).toISOString();
        info.namespace = namespace;
        info.event = info.level;
        const keys = Object.keys(info).sort();

        let message = colorizer.colorize(info.level, `${info.created} ${info.level}: ${info.message}`);

        keys.forEach(function (key) {
            if (info[key] !== undefined && !ignoredKeys.includes(key)) {
                message += `\n  -> ${key}: ${info[key]}`;
            }
        });

        return message;
    });
};

module.exports = humanFormatter;
