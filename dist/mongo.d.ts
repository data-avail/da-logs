import * as types from "./types";
import * as Promise from "bluebird";
export interface ILoggerMongoOpts {
    connection: string;
    collection: string;
}
export declare class LoggerMongo implements types.ILogger {
    private tags;
    private db;
    private insertAsync;
    constructor(opts: types.ILoggerOpts, mongoOpts: ILoggerMongoOpts);
    write(obj: Object): Promise<any>;
}
