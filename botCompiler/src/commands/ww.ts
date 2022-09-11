import { Command } from "../handler/commands";
import discord from 'discord.js'
import { sleep } from "../functions";
export default new Command({
    name:'ww',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        await interaction.reply('test complited!')
    }
})