import ApplicationLogger from "./ApplicationLogger";

declare global {
    namespace Express {
        export interface Request {
            logger?: ApplicationLogger
        }
    }
}
