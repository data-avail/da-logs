///<reference path="../typings/tsd.d.ts"/>
///<reference path="./types.d.ts"/>

var mongojs = require("mongojs");

export interface ILoggerMongoOpts {
    connection: string
    collection: string
}

export class LoggerMongo implements logs.ILogger {

    private tags: string[];
    private db: any;
    private insertAsync: (obj: Object) => Promise<any>;

    constructor(opts: logs.ILoggerOpts, mongoOpts: ILoggerMongoOpts) {
        this.tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter((f) => !!f);

        this.db = mongojs(mongoOpts.connection, [mongoOpts.collection]);
        this.insertAsync = Promise.promisify(this.db[mongoOpts.collection].insert, this.db[mongoOpts.collection]);
    }

    write(obj: Object): Promise<any> {
        var doc = { tags: this.tags, msg: obj, date: new Date() };
        return this.insertAsync(doc);
    }
}
