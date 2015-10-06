import * as Promise from "bluebird";
import * as types from "./types";
export interface ILoggerLogglyOpts {
    token: string;
    subdomain: string;
}
export declare class LoggerLoggly implements types.ILogger {
    private loggly;
    constructor(opts: types.ILoggerOpts, logglyOpts: ILoggerLogglyOpts);
    write(obj: Object): Promise<any>;
}
