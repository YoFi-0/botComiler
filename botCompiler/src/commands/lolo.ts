import { Command } from "../handler/commands";
import discord from 'discord.js'
import { sleep } from "../functions";
export default new Command({
    name:'lolo',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        await interaction.deferReply()
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button1')
					.setLabel('Click me!')
					.setStyle(discord.ButtonStyle.Primary),
			);
        await sleep(3000)
        interaction.editReply({
            content:'click the button to complit the test',
            components: [row as any],
        })
    }
})