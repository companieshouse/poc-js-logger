import { RequestHandler } from 'express';
import LoggerOptions from "./LoggerOptions";
import StructuredLogger from "./StructuredLogger";
export declare class ChLogger {
    logger: StructuredLogger;
    middleware: RequestHandler;
    constructor(options: LoggerOptions);
}
