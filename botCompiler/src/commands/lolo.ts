import { Command } from "../handler/commands";
import discord from 'discord.js'
import { sleep } from "../functions";
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import { BotConfigType } from '../types'
const readFile = promisify(fs.readFile)
export default new Command({
    name:'lolo',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
        const config:BotConfigType = JSON.parse(configReder)
        await interaction.deferReply()
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button1')
					.setLabel('Click me!')
					.setStyle(config[9].content ? config[9].content : 'Primary' as any),
			);
        await sleep(3000)
        interaction.editReply({
            content:'click the button to complit the test',
            components: [row as any],
        })
    }
})