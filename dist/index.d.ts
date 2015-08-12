import Promise = require('bluebird');
export interface ILoggerOpts {
    pack: {
        name: string;
        ver: string;
    };
    tags: string[];
}
export interface ILogger {
    write(obj: Object): void;
}






export interface ILoggerLogglyOpts {
    token: string;
    subdomain: string;
}
export declare class LoggerLoggly implements ILogger {
    private loggly;
    constructor(opts: ILoggerOpts, logglyOpts: ILoggerLogglyOpts);
    write(obj: Object): Promise<any>;
}






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
