import * as Promise from "bluebird";
import * as loggly from "./loggly";
import * as mongo from "./mongo";
import * as types from "./types";
export interface ILoggerComposeOpts {
    loggly?: loggly.ILoggerLogglyOpts;
    mongo?: mongo.ILoggerMongoOpts;
    console?: boolean;
}
export declare class LoggerCompose implements types.ILogger {
    private loggers;
    constructor(opts: types.ILoggerOpts, composeOpts: ILoggerComposeOpts);
    write(obj: Object): Promise<any>;
}
export declare type ILogger = types.ILogger;
export declare type ILoggerOpts = types.ILoggerOpts;
