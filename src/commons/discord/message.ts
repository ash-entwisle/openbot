import { EmbedBuilder } from "discord.js";
import { Bot } from "./bot";

/**
 * Represents a reply to a Discord interaction.
 */
export interface IMessage {
    /**
     * The interaction object that represents the command invocation.
     */
    interaction: any;
    /**
     * Type of the reply.
     */
    type: EMessageType;
    /**
     * The title of the reply.
     * @default ""
     */
    title?: string;
    /**
     * The content of the reply.
     * @default ""
     */
    content?: string;
    /**
     * The footer of the reply.
     * @default ""
     */
    footer?: string;
    /**
     * the url of the footer icon.
     * @default Bot.getInstance().config.embed.footerIcon
     */
    footerIcon?: string;
    /**
     * The Hex Code of the color of the reply.
     * @default Bot.getInstance().config.embed.color
     */ 
    color?: string;
    /**
     * Whether the reply should be ephemeral.
     * @default false
     */
    ephemeral?: boolean;
    /**
     * Whether the reply should have a timestamp.
     * @default false
     */
    timestamp?: boolean;
    /**
     * Whether the reply should be a reply to the original message.
     * @default false
     */
    noreply?: boolean;
}

export enum EMessageType {
    /**
     * A regular message.
     */
    Message,
    /**
     * An embed message.
     */
    Embed
}


export function message(data: IMessage) {
    if (data.type === EMessageType.Embed) {
        
        let embed = new EmbedBuilder().setColor(data.color ?? Bot.getInstance().config.embed.color)

        if (data.title) embed.setTitle(data.title);
        if (data.content) embed.setDescription(data.content);
        if (data.timestamp) embed.setTimestamp();
        if (data.footer) embed.setFooter({text: data.footer});

        if (!data.noreply) {
            return data.interaction.reply({
                embeds: [embed],
                ephemeral: data.ephemeral ?? false
            });
        }
        else {
            return data.interaction.channel.send({
                embeds: [embed]
            });
        }
    }

    else {
        
        if (!data.noreply) {
            return data.interaction.reply({
                content: data.content ?? "",
                ephemeral: data.ephemeral ?? false
            });
        }
        
        else {
            return data.interaction.channel.send({
                content: data.content ?? ""
            });
        }
    }
}

export default {
    message,
}