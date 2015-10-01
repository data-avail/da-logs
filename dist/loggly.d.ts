/// <reference path="../typings/tsd.d.ts" />
import Promise = require("bluebird");
import types = require("./types");
import ILogger = types.ILogger;
import ILoggerOpts = types.ILoggerOpts;
export interface ILoggerLogglyOpts {
    token: string;
    subdomain: string;
}
export declare class LoggerLoggly implements ILogger {
    private loggly;
    constructor(opts: ILoggerOpts, logglyOpts: ILoggerLogglyOpts);
    write(obj: Object): Promise<any>;
}
