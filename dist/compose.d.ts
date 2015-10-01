/// <reference path="../typings/tsd.d.ts" />
import Promise = require("bluebird");
import types = require("./types");
import loggly = require("./loggly");
import mongo = require("./mongo");
import ILoggerLogglyOpts = loggly.ILoggerLogglyOpts;
import ILoggerMongoOpts = mongo.ILoggerMongoOpts;
import ILoggerOpts = types.ILoggerOpts;
import ILogger = types.ILogger;
export interface ILoggerComposeOpts {
    loggly?: ILoggerLogglyOpts;
    mongo?: ILoggerMongoOpts;
    console?: boolean;
}
export declare class LoggerCompose implements ILogger {
    private loggers;
    constructor(opts: ILoggerOpts, composeOpts: ILoggerComposeOpts);
    write(obj: Object): Promise<any>;
}
