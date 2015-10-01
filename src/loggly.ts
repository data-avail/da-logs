///<reference path="../typings/tsd.d.ts"/>

var loggly = require("loggly");
import Promise = require("bluebird");
import types = require("./types");

import ILogger = types.ILogger;
import ILoggerOpts = types.ILoggerOpts;


export interface ILoggerLogglyOpts  {
    token: string
    subdomain: string
}

export class LoggerLoggly implements ILogger {

    private loggly: any;

    constructor(opts: ILoggerOpts, logglyOpts : ILoggerLogglyOpts) {
        var tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter((f) => !!f);
        var logOpts = {
            token: logglyOpts.token,
            subdomain: logglyOpts.subdomain,
            tags: tags,
            json:true
        };
        this.loggly = Promise.promisifyAll(loggly.createClient(logOpts));
    }

    write(obj: Object) : Promise<any> {
        return this.loggly.logAsync(obj);
    }
}

