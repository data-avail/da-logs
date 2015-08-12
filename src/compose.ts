///<reference path="../typings/tsd.d.ts"/>
import Promise = require("bluebird");
import types = require("./types");
import loggly = require("./loggly");
import mongo = require("./mongo");


import LoggerLoggly = loggly.LoggerLoggly;
import LoggerMongo = mongo.LoggerMongo;
import ILoggerLogglyOpts = loggly.ILoggerLogglyOpts;
import ILoggerMongoOpts = mongo.ILoggerMongoOpts;
import  ILoggerOpts = types.ILoggerOpts;
import  ILogger = types.ILogger;

 
export interface ILoggerComposeOpts {
    loggly?: ILoggerLogglyOpts
    mongo?: ILoggerMongoOpts
    console?: boolean
}

export class LoggerCompose implements ILogger {

    private loggers: ILogger[];

    constructor(opts: ILoggerOpts, composeOpts : ILoggerComposeOpts) {
        this.loggers = [];
        if (composeOpts.loggly && composeOpts.loggly.token)
            this.loggers.push(new LoggerLoggly(opts, composeOpts.loggly));
        if (composeOpts.mongo && composeOpts.mongo.connection)
            this.loggers.push(new LoggerMongo(opts, composeOpts.mongo));
        if (composeOpts.console)
            this.loggers.push({write(obj) { console.log("logger>>>", obj); return Promise.resolve(); } });
    }

    write(obj: Object) : Promise<any> {
        return Promise.all(this.loggers.map(m => m.write(obj)));
    }
}



