"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.ECommandOption = void 0;
var discord_js_1 = require("discord.js");
/**
 * Enum representing the different types of options that can be used for a command.
 */
var ECommandOption;
(function (ECommandOption) {
    ECommandOption[ECommandOption["StringOption"] = 0] = "StringOption";
    ECommandOption[ECommandOption["IntegerOption"] = 1] = "IntegerOption";
    ECommandOption[ECommandOption["NumberOption"] = 2] = "NumberOption";
    ECommandOption[ECommandOption["BooleanOption"] = 3] = "BooleanOption";
    ECommandOption[ECommandOption["UserOption"] = 4] = "UserOption";
    ECommandOption[ECommandOption["ChannelOption"] = 5] = "ChannelOption";
    ECommandOption[ECommandOption["RoleOption"] = 6] = "RoleOption";
    ECommandOption[ECommandOption["MentionableOption"] = 7] = "MentionableOption";
    ECommandOption[ECommandOption["AttachmentOption"] = 8] = "AttachmentOption";
})(ECommandOption || (exports.ECommandOption = ECommandOption = {}));
/**
 * Represents a command that can be executed by a user in a Discord server.
 */
var Command = /** @class */ (function () {
    /**
     * Creates a new Command object.
     * @param data An object that contains the command's properties.
     * @returns Command
     */
    function Command(data) {
        var _a, _b, _c, _d;
        this.command = new discord_js_1.SlashCommandBuilder()
            .setName(data.name)
            .setDescription(data.description)
            .setDMPermission((_a = data.dmPermission) !== null && _a !== void 0 ? _a : false)
            .setNSFW((_b = data.nsfw) !== null && _b !== void 0 ? _b : false);
        this.admin = (_c = data.admin) !== null && _c !== void 0 ? _c : false;
        this.execute = data.execute;
        if (data.options) {
            var _loop_1 = function (option) {
                var tempOption;
                switch (option.type) {
                    case ECommandOption.StringOption:
                        this_1.command.addStringOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.IntegerOption:
                        this_1.command.addIntegerOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.NumberOption:
                        this_1.command.addNumberOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.BooleanOption:
                        this_1.command.addBooleanOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.UserOption:
                        this_1.command.addUserOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.ChannelOption:
                        this_1.command.addChannelOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.RoleOption:
                        this_1.command.addRoleOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.MentionableOption:
                        this_1.command.addMentionableOption(function (option) { return tempOption = option; });
                        break;
                    case ECommandOption.AttachmentOption:
                        this_1.command.addAttachmentOption(function (option) { return tempOption = option; });
                        break;
                    default:
                        throw new Error("Invalid command option type: ".concat(option.type));
                }
                if (option.choices) {
                    for (var _f = 0, _g = option.choices; _f < _g.length; _f++) {
                        var choice = _g[_f];
                        tempOption.addChoices({ name: choice.name, value: choice.value });
                    }
                }
                tempOption
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired((_d = option.required) !== null && _d !== void 0 ? _d : false);
            };
            var this_1 = this;
            for (var _i = 0, _e = data.options; _i < _e.length; _i++) {
                var option = _e[_i];
                _loop_1(option);
            }
        }
    }
    return Command;
}());
exports.Command = Command;
