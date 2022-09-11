import { Command } from "../handler/commands";
import discord from 'discord.js'
import { sleep } from "../functions";
import config from '../config.json'
export default new Command({
    name:'insert_data',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        if (!interaction.isChatInputCommand()) {
            return
        };
        const modal = new discord.ModalBuilder()
			.setCustomId('insert_data')
			.setTitle(config[1].content as string);

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new discord.TextInputBuilder()
			.setCustomId('row1')
			.setLabel("username")
			.setStyle(discord.TextInputStyle.Short);

		const hobbiesInput = new discord.TextInputBuilder()
			.setCustomId('row2')
			.setLabel("email")
			.setStyle(discord.TextInputStyle.Short);
		const firstActionRow = new discord.ActionRowBuilder().addComponents(favoriteColorInput) as discord.ActionRowBuilder<discord.TextInputBuilder>;
		const secondActionRow = new discord.ActionRowBuilder().addComponents(hobbiesInput) as discord.ActionRowBuilder<discord.TextInputBuilder>;

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
})