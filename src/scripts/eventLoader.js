"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventLoader = void 0;
var fs = require('node:fs');
var path = require('node:path');
function eventLoader(eventsPath, bot) {
    var eventFiles = fs.readdirSync(eventsPath).filter(function (file) { return file.endsWith('.ts'); });
    var _loop_1 = function (file) {
        var filePath = path.join(eventsPath, file);
        var event_1 = require(filePath);
        if (event_1.once) {
            bot.client.once(event_1.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event_1.execute.apply(event_1, args);
            });
        }
        else {
            bot.client.on(event_1.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event_1.execute.apply(event_1, args);
            });
        }
    };
    for (var _i = 0, eventFiles_1 = eventFiles; _i < eventFiles_1.length; _i++) {
        var file = eventFiles_1[_i];
        _loop_1(file);
    }
}
exports.eventLoader = eventLoader;
