/// <reference path="../typings/tsd.d.ts" />
import Promise = require("bluebird");
import types = require("./types");
import ILogger = types.ILogger;
import ILoggerOpts = types.ILoggerOpts;
export interface ILoggerMongoOpts {
    connection: string;
    collection: string;
}
export declare class LoggerMongo implements ILogger {
    private tags;
    private db;
    private insertAsync;
    constructor(opts: ILoggerOpts, mongoOpts: ILoggerMongoOpts);
    write(obj: Object): Promise<any>;
}
