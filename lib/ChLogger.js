"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareFactory_1 = __importDefault(require("./MiddlewareFactory"));
const LoggerFactory_1 = __importDefault(require("./LoggerFactory"));
class ChLogger {
    constructor(options) {
        this.logger = LoggerFactory_1.default.create(options);
        this.middleware = MiddlewareFactory_1.default.create(this.logger);
    }
}
exports.ChLogger = ChLogger;
//# sourceMappingURL=ChLogger.js.map