/// <reference path="../src/types.d.ts" />
export interface ILoggerMongoOpts {
    connection: string;
    collection: string;
}
export declare class LoggerMongo implements logs.ILogger {
    private tags;
    private db;
    private insertAsync;
    constructor(opts: logs.ILoggerOpts, mongoOpts: ILoggerMongoOpts);
    write(obj: Object): Promise<any>;
}
