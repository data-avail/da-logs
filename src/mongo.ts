import * as types from "./types"
import * as Promise from "bluebird"

var mongojs = require("mongojs");

export interface ILoggerMongoOpts {
    connection: string
    collection: string
}

export class LoggerMongo implements types.ILogger {

    private tags: string[];
    private db: any;
    private insertAsync: (obj: Object) => Promise<any>;

    constructor(opts: types.ILoggerOpts, mongoOpts: ILoggerMongoOpts) {
        this.tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter((f) => !!f);

        this.db = mongojs(mongoOpts.connection, [mongoOpts.collection]);
        this.insertAsync = Promise.promisify(this.db[mongoOpts.collection].insert, this.db[mongoOpts.collection]);
    }

    write(obj: Object): Promise<any> {
        var doc = { tags: this.tags, msg: obj, date: new Date() };
        return this.insertAsync(doc);
    }
}
