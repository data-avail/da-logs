///<reference path="../typings/tsd.d.ts"/>
///<reference path="./types.d.ts"/>
var mongojs = require("mongojs");
var LoggerMongo = (function () {
    function LoggerMongo(opts, mongoOpts) {
        this.tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter(function (f) { return !!f; });
        this.db = mongojs(mongoOpts.connection, [mongoOpts.collection]);
        this.insertAsync = Promise.promisify(this.db[mongoOpts.collection].insert, this.db[mongoOpts.collection]);
    }
    LoggerMongo.prototype.write = function (obj) {
        var doc = { tags: this.tags, msg: obj, date: new Date() };
        return this.insertAsync(doc);
    };
    return LoggerMongo;
})();
exports.LoggerMongo = LoggerMongo;
