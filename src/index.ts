import compose = require("./compose")
import mongo = require("./mongo")
import loggly = require("./loggly")

module logs {
	export var LoggerCompose = compose.LoggerCompose;
	export var LoggerLoggly = loggly.LoggerLoggly;
	export var MongoLoggly = mongo.LoggerMongo;
}

export = logs;