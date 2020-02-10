import { Logger, LeveledLogMethod } from "winston";
interface StructuredLogger extends Logger {
    trace: LeveledLogMethod;
    request: LeveledLogMethod;
}
export = StructuredLogger;
