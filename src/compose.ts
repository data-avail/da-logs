import * as Promise from "bluebird"
import * as loggly from "./loggly"
import * as mongo from "./mongo"
import * as types from "./types"

export interface ILoggerComposeOpts {
    loggly?: loggly.ILoggerLogglyOpts
    mongo?: mongo.ILoggerMongoOpts
    console?: boolean
}

export class LoggerCompose implements types.ILogger {

    private loggers: types.ILogger[];

    constructor(opts: types.ILoggerOpts, composeOpts: ILoggerComposeOpts) {
        this.loggers = [];
        if (composeOpts.loggly && composeOpts.loggly.token)
            this.loggers.push(new loggly.LoggerLoggly(opts, composeOpts.loggly));
        if (composeOpts.mongo && composeOpts.mongo.connection)
            this.loggers.push(new mongo.LoggerMongo(opts, composeOpts.mongo));
        if (composeOpts.console)
            this.loggers.push({ write(obj) { console.log("logger>>>", obj); return Promise.resolve(); } });
    }

    write(obj: Object): Promise<any> {
        return Promise.all(this.loggers.map(m => m.write(obj)));
    }
}

export type ILogger = types.ILogger; 
export type ILoggerOpts = types.ILoggerOpts;




