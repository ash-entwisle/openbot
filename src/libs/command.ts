import { Attachment, SlashCommandBuilder } from "discord.js";

/**
 * Represents the data required to define a command.
 */
export interface ICommandData {
    /**
     * The name of the command, this is what the user will type to execute the command.
     */
    name: string;
    /**
     * A brief description of the command. This is displayed in the help menu and in command suggestions.
     */
    description: string;
    /**
     * An array of options for the command. See the ICommandOption interface for more information.
     * @default []
     */
    options?: ICommandOption[];
    /**
     * Whether the command can be executed in a DM.
     * @default false
     */
    dmPermission?: boolean;
    /**
     * Whether the command is NSFW (Not Safe For Work).
     * @default false
     */
    nsfw?: boolean;  
    /**
     * Whether the command requires admin permission to be executed.
     * @default false
     */
    admin?: boolean;
    /**
     * The function to execute when the command is called.
     * @param interaction - The interaction object representing the command call.
     * @returns void
     */
    execute: (interaction: any) => void;
    /**
     * Wether the command should be enabled or not.
     */
    enabled?: boolean;
}

/**
 * Represents an option for a command.
 */
export interface ICommandOption {
    /**
     * The type of the option. See the ECommandOption enum for a list of valid types. 
     */
    type: ECommandOption;
    /**
     * The name of the option. This is what the user will type to set the option.
     */
    name: string;
    /**
     * The description of the option. This is displayed in the help menu and in command suggestions.
     */
    description: string;
    /**
     * Whether the option is required or not. If an option is required, the user must set it when executing the command.
     * @default false
     */
    required?: boolean;
    /**
     * The choices for the option. This is an array of objects that contain the name and value of the choice.
     * TODO: Implement choices, may need to make a pr to discord.js
     * @default []
     */
    choices?: ICommandOptionChoice[];
}

/**
 * Represents a choice for a command option.
 */
export interface ICommandOptionChoice {
    /**
     * The name of the choice. This is what the user will type to set the choice.
     */
    name: string;
    /**
     * The value of the choice, can be a string or a number. This is what the choice will be set to.
     */
    value: string | number;
}

/**
 * Enum representing the different types of options that can be used for a command.
 */
export enum ECommandOption {
    StringOption,
    IntegerOption,
    NumberOption,
    BooleanOption,
    UserOption,
    ChannelOption,
    RoleOption,
    MentionableOption,
    AttachmentOption,
} 


/**
 * Represents a command that can be executed by a user in a Discord server.
 */
export class Command {
    /**
     * The SlashCommandBuilder object that defines the command's properties.
     */
    public command: SlashCommandBuilder;

    /**
     * Whether the command can only be executed by server administrators.
     */
    public admin: boolean;

    /**
     * The function that is executed when the command is invoked.
     * @param interaction The interaction object that represents the command invocation.
     * @returns void
     */
    public execute: (interaction: any) => void;

    /**
     * Creates a new Command object.
     * @param data An object that contains the command's properties.
     * @returns Command
     */
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

                if (option.choices) {
                    for (const choice of option.choices) {
                        tempOption.addChoices({name: choice.name, value: choice.value});
                    }
                }
                
                tempOption
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? false);
            }
        }
    }
}