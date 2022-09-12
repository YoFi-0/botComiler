import { Event } from '../handler/events';
import {client} from '../handler/runner'
import discord from 'discord.js'
import { UsersTabe } from '../tables/user';
import config from '../config.json'
export default new Event("messageCreate", async (massge:discord.Message) => {
    if(massge.content == 'lolo'){
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button2')
					.setLabel('Click me!')
					.setStyle(discord.ButtonStyle.Primary),
			);
        
        if(config[3].content == true){
            row.addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('button3')
                    .setLabel('Click me!')
                    .setStyle(config[4].content as any),
            );
        }
        massge.channel.send({
            content:'a yow',
            components: [row as any] 
        })
    }
    if(massge.content == 'AllUsers'){
        var getUsers
        try{
            getUsers = await UsersTabe.findAll({})
        } catch(err){
            massge.reply('server error')
            return
        }
        if(getUsers.length == 0){
            massge.reply('teher is no users if you insert some users then test is feild')
            return
        }
        const users = getUsers.map(user => user.get())
        massge.reply(`test completed
${JSON.stringify(users)}
`)
    }
});