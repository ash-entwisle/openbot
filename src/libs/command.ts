import { Attachment, SlashCommandBuilder } from "discord.js";

export interface ICommandData {
    name: string;
    description: string;
    options?: ICommandOption[];
    dmPermission?: boolean;
    nsfw?: boolean;  
    admin?: boolean;
    execute: (interaction: any) => void;
}

export interface ICommandOption {
    type: ECommandOption;
    name: string;
    description: string;
    required?: boolean;
    // choices?: ICommandOptionChoice[]; // TODO: Implement choices
}

export enum ECommandOption {
    StringOption = "STRING",
    IntegerOption = "INTEGER",
    NumberOption = "NUMBER",
    BooleanOption = "BOOLEAN",
    UserOption = "USER",
    ChannelOption = "CHANNEL",
    RoleOption = "ROLE",
    MentionableOption = "MENTIONABLE",
    AttachmentOption = "ATTACHMENT",
}


export class Command {
    public command: SlashCommandBuilder;
    public admin: boolean;
    public execute: (interaction: any) => void;

    constructor(data: ICommandData) {
        this.command = new SlashCommandBuilder()
            .setName(data.name)
            .setDescription(data.description)
            .setDMPermission(data.dmPermission ?? false)
            .setNSFW(data.nsfw ?? false);

        this.admin = data.admin ?? false;
        this.execute = data.execute;

        if (data.options) {
            for (const option of data.options){
                let tempOption: any;
                switch (option.type) {
                    case ECommandOption.StringOption:
                        this.command.addStringOption(option => tempOption = option);
                        break;
                    case ECommandOption.IntegerOption:
                        this.command.addIntegerOption(option => tempOption = option);
                        break;
                    case ECommandOption.NumberOption:
                        this.command.addNumberOption(option => tempOption = option);
                        break;
                    case ECommandOption.BooleanOption:
                        this.command.addBooleanOption(option => tempOption = option);
                        break;
                    case ECommandOption.UserOption:
                        this.command.addUserOption(option => tempOption = option);
                        break;
                    case ECommandOption.ChannelOption:
                        this.command.addChannelOption(option => tempOption = option);
                        break;
                    case ECommandOption.RoleOption:
                        this.command.addRoleOption(option => tempOption = option);
                        break;
                    case ECommandOption.MentionableOption:
                        this.command.addMentionableOption(option => tempOption = option);
                        break;
                    case ECommandOption.AttachmentOption:
                        this.command.addAttachmentOption(option => tempOption = option);
                        break;
                    default:
                        throw new Error(`Invalid command option type: ${option.type}`);
                }
                
                tempOption
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? false);
            }
        }
    }
}