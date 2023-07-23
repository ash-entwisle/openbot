import { EmbedBuilder } from "discord.js";
import { Bot } from "./bot";

export interface Reply {
    interaction: any;
    title?: string;
    content?: string;
    ephemeral?: boolean;
}

export function message(data: Reply) {
    return data.interaction.reply({
        content: data.content,
        ephemeral: data.ephemeral ?? false
    });
}

export function embed(data: Reply) {
    let embed = new EmbedBuilder()
        .setColor(Bot.getInstance().config.embed.color)
        .setTimestamp();
    
    if (data.title) embed.setTitle(data.title);
    if (data.content) embed.setDescription(data.content);

    return data.interaction.reply({
        embeds: [embed],
        ephemeral: data.ephemeral ?? false
    });
}

export default {
    message,
    embed
}