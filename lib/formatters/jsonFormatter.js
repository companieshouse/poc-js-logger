const winston = require("winston");

const jsonFormatter = function (namespace) {

    return winston.format.printf(function (info) {

        const message = {
            created: (new Date()).toISOString(),
            event: info.level,
            namespace: namespace,
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
};

module.exports = jsonFormatter;
