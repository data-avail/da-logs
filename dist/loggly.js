var loggly = require("loggly");
var LoggerLoggly = (function () {
    function LoggerLoggly(opts, logglyOpts) {
        var tags = [opts.pack.name, opts.pack.ver].concat(opts.tags).filter(function (f) { return !!f; });
        var logOpts = {
            token: logglyOpts.token,
            subdomain: logglyOpts.subdomain,
            tags: tags,
            json: true
        };
        this.loggly = Promise.promisifyAll(loggly.createClient(logOpts));
    }
    LoggerLoggly.prototype.write = function (obj) {
        return this.loggly.logAsync(obj);
    };
    return LoggerLoggly;
})();
exports.LoggerLoggly = LoggerLoggly;
