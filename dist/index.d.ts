import compose = require("./compose");
import mongo = require("./mongo");
import loggly = require("./loggly");
declare module logs {
    var LoggerCompose: typeof compose.LoggerCompose;
    var LoggerLoggly: typeof loggly.LoggerLoggly;
    var MongoLoggly: typeof mongo.LoggerMongo;
}
export = logs;
