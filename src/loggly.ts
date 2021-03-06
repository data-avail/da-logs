import * as Promise from "bluebird"
import * as types from "./types"
var loggly = require("loggly");
    
export interface ILoggerLogglyOpts {
    token: string
    subdomain: string
}


export class LoggerLoggly implements types.ILogger {

    private loggly: any;

    constructor(opts: types.ILoggerOpts, logglyOpts: ILoggerLogglyOpts) {
        var tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter((f) => !!f);
        var logOpts = {
            token: logglyOpts.token,
            subdomain: logglyOpts.subdomain,
            tags: tags,
            json: true
        };
        this.loggly = Promise.promisifyAll(loggly.createClient(logOpts));
    }

    write(obj: Object): Promise<any> {
        return this.loggly.logAsync(obj);
    }
}
        


