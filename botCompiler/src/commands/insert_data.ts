import { Command } from "../handler/commands";
import discord from 'discord.js'
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import { BotConfigType } from '../types'
const readFile = promisify(fs.readFile)
export default new Command({
    name:'insert_data',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
		const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
        const config:BotConfigType = JSON.parse(configReder)
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