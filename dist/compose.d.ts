import * as Promise from "bluebird";
import * as loggly from "./loggly";
import * as mongo from "./mongo";
export interface ILoggerComposeOpts {
    loggly?: loggly.ILoggerLogglyOpts;
    mongo?: mongo.ILoggerMongoOpts;
    console?: boolean;
}
export declare class LoggerCompose implements logs.ILogger {
    private loggers;
    constructor(opts: logs.ILoggerOpts, composeOpts: ILoggerComposeOpts);
    write(obj: Object): Promise<any>;
}
