/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/types.d.ts" />
export interface ILoggerLogglyOpts {
    token: string;
    subdomain: string;
}
export declare class LoggerLoggly implements logs.ILogger {
    private loggly;
    constructor(opts: logs.ILoggerOpts, logglyOpts: ILoggerLogglyOpts);
    write(obj: Object): Promise<any>;
}
