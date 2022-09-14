//out script [in lansher]
import discord from 'discord.js'
import discordModals from "discord-modals";
import intents from "./intents";
import {connection} from "../connections";
import config from '../config.json'


import {promisify} from 'util'
import {Event} from './events'
import fs from 'fs'
import path from 'path'
import { CommandType, CustmIdFunctionOptions, Custom_idType, RegisterCommandsOptionsType, RunOptions } from "../types";
import { UsersTabe } from '../tables';
import { sleep } from '../functions';
//out script [in lansher]

const readdir = promisify(fs.readdir)
const getJSTSFileFrom = async(filesPath:string) => {
    return (await readdir(path.join(__dirname, `../${filesPath}`))).map(file => {
        if(file.endsWith('.js') || file.endsWith('.ts')){
            return `../${filesPath}/${file}`.replace('.ts', '').replace('.js', '')
        }
    })
}








export class Bot  extends discord.Client{
    commands: discord.Collection<string, CommandType> = new discord.Collection();
    constructor(){
        super({
            intents: intents
        })
    }

    async start() {
        try{
            await connection.sync({
                logging:false,
            })
            UsersTabe
            console.log('database connected')
        } catch(err){
            console.log(err)
            console.log('database err')
            return
        }
        discordModals(this);
        await this.injectEveryThing();
        await this.login(config[0].content as string);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async addCommands({commands}:RegisterCommandsOptionsType){
        for(let i = 0; i < commands.length; i++){
            await this.application!.commands.create(commands[i])
        }
        console.log('command adedd')
    }

    async injectEveryThing(){
        const slashCommands: discord.ApplicationCommandDataResolvable[] = [];
        const commands =  await getJSTSFileFrom('commands');
        commands.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath!);
            if (!command.name){
                return
            };
            this.commands.set(command.name, command);
            slashCommands.push(command);
        })
        this.on("ready", async() => {
            await this.addCommands({
                commands: slashCommands,
            });
        })
        const events =  await getJSTSFileFrom('events');
        events.forEach(async (filePath) => {
            const event: Event<keyof discord.ClientEvents> = await this.importFile(
                filePath!
            );
            this.on(event.event, event.run);
        })

        const custm_id =  await getJSTSFileFrom('custm_id');
        
        this.on('interactionCreate', (interaction:any) => {
            custm_id.forEach(async(filePath) => {
                const id:Custom_idType = await this.importFile(
                    filePath!
                );
                if((interaction.customId == id.id)){
                    const params:CustmIdFunctionOptions = {
                        client:this,
                        interaction:interaction as discord.ButtonInteraction<discord.CacheType>,
                    }
                    id.run(params)
                }
            })
        })
    }
}

export const client = new Bot()

const main = async() => {
    await client.start()
    console.log('bot started')
}
main()






