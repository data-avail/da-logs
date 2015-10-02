///<reference path="./types.d.ts"/>

import * as loggly from "./loggly"
import * as mongo from "./mongo"

export interface ILoggerComposeOpts {
    loggly?: loggly.ILoggerLogglyOpts
    mongo?: mongo.ILoggerMongoOpts
    console?: boolean
}

export class LoggerCompose implements logs.ILogger {

    private loggers: logs.ILogger[];

    constructor(opts: logs.ILoggerOpts, composeOpts: ILoggerComposeOpts) {
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




