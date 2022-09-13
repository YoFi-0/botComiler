import {client} from '../handler/runner'
import {Event} from '../handler/events'
import { ExtendedInteraction } from '../types'
import discord from 'discord.js'
export default new Event("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non existent command");

        command.run({
            args: interaction.options as discord.CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        });
    }
})