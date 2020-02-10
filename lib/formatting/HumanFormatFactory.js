"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const winston_1 = __importDefault(require("winston"));
class HumanFormatFactory {
    static create(namespace) {
        const colorizer = winston_1.default.format.colorize();
        return winston_1.default.format.printf(function (info) {
            const messageInfo = {
                created: (new Date()).toISOString(),
                namespace: namespace,
                event: info.level,
                path: info.path,
                method: info.method,
                status: info.status,
                duration: info.duration
            };
            const keys = Object.keys(messageInfo).sort();
            let message = colorizer.colorize(info.level, `${messageInfo.created} ${messageInfo.event}: ${info.message}`);
            keys.forEach(function (key) {
                if (messageInfo[key] !== undefined) {
                    message += `\n  -> ${key}: ${messageInfo[key]}`;
                }
            });
            return message;
        });
    }
}
module.exports = HumanFormatFactory;
//# sourceMappingURL=HumanFormatFactory.js.map