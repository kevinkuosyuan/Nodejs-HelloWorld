var server = require("./server");
var route = require("./route");
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.start;
handlers["/start"] = requestHandlers.start;
handlers["/upload"] = requestHandlers.upload;
handlers["/show"] = requestHandlers.show;

server.openserver(route.route, handlers);