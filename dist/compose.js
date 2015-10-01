///<reference path="../typings/tsd.d.ts"/>
var Promise = require("bluebird");
var loggly = require("./loggly");
var mongo = require("./mongo");
var LoggerLoggly = loggly.LoggerLoggly;
var LoggerMongo = mongo.LoggerMongo;
var LoggerCompose = (function () {
    function LoggerCompose(opts, composeOpts) {
        this.loggers = [];
        if (composeOpts.loggly && composeOpts.loggly.token)
            this.loggers.push(new LoggerLoggly(opts, composeOpts.loggly));
        if (composeOpts.mongo && composeOpts.mongo.connection)
            this.loggers.push(new LoggerMongo(opts, composeOpts.mongo));
        if (composeOpts.console)
            this.loggers.push({ write: function (obj) { console.log("logger>>>", obj); return Promise.resolve(); } });
    }
    LoggerCompose.prototype.write = function (obj) {
        return Promise.all(this.loggers.map(function (m) { return m.write(obj); }));
    };
    return LoggerCompose;
})();
exports.LoggerCompose = LoggerCompose;
