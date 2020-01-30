const config = {
    level: process.env.LOG_LEVEL && process.env.LOG_LEVEL.toLowerCase() || "trace",
    humanReadable: process.env.HUMAN_LOG === undefined ?
        false :
        process.env.HUMAN_LOG === "1"
};

module.exports = config;
