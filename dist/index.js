var compose = require("./compose");
var mongo = require("./mongo");
var loggly = require("./loggly");
var logs;
(function (logs) {
    logs.LoggerCompose = compose.LoggerCompose;
    logs.LoggerLoggly = loggly.LoggerLoggly;
    logs.MongoLoggly = mongo.LoggerMongo;
})(logs || (logs = {}));
module.exports = logs;
