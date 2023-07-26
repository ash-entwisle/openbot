import { EmbedBuilder } from "discord.js";
import { Bot } from "./bot";

export interface Reply {
    interaction: any;
    title?: string;
    content?: string;
    footer?: string;
    footerIcon?: string;
    color?: string;
    ephemeral?: boolean;
    timestamp?: boolean;
}

export function message(data: Reply) {
    return data.interaction.reply({
        content: data.content,
        ephemeral: data.ephemeral ?? false
    });
}

export function embed(data: Reply) {
    let embed = new EmbedBuilder().setColor(data.color ?? Bot.getInstance().config.embed.color)
    
    if (data.title) embed.setTitle(data.title);
    if (data.content) embed.setDescription(data.content);
    if (data.timestamp) embed.setTimestamp();
    if (data.footer) embed.setFooter({text: data.footer});

    return data.interaction.reply({
        embeds: [embed],
        ephemeral: data.ephemeral ?? false
    });
}

export default {
    message,
    embed
}