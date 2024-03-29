import fs  from 'fs';
import {promisify}  from 'util';
import path  from 'path';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

var glopalVariables = ''

const getGlopalVariables = async(dirPath:string) => {
    const dirs = await readdir(dirPath)
    for(let i = 0; i < dirs.length; i = i + 1){
        if(!dirs[i].endsWith('.ts')){
            continue;
        }
        const finalObject = await readFile(path.join(dirPath, dirs[i]), 'utf-8')
        finalObject.split('\n').forEach(line => {
            if(line.startsWith('var ') || line.startsWith('const ') || line.startsWith('let ')){
                glopalVariables += line + '\n'
            }
        })
    }
}
const getFileOpject =async (dirPath:string) => {
    const isImportLine = (file:string[]) =>{
        const filnal:any[] = []
        for(let i = 0; i < file.length; i++){
            if(file[i].startsWith('import')){
                continue;
            }
            if(file[i].startsWith('var ') || file[i].startsWith('const ') || file[i].startsWith('let ')){
                continue;
            }
            filnal.push(file[i].replace(/export default/g, '').replace(/export/g, ''))
        }
        return filnal.join('\n')
    }
    getGlopalVariables(dirPath)
    const objects:any[] = []
    const dirs = await readdir(dirPath)
    for(let i = 0; i < dirs.length; i = i + 1){
        if(!dirs[i].endsWith('.ts')){
            continue;
        }
        const finalObject = await readFile(path.join(dirPath, dirs[i]), 'utf-8')
        objects.push(isImportLine(finalObject.split('\n')))
    }
    return objects.join()
}

type BotConfigType = {
    index:number,
    isrRequire:boolean
    inputType:string,
    options?:string[]
    content:string | boolean | string[],
    inputTitle:string
    from:number
}[]

const getTypes = async(dirPath:string) => {
    const isImportLine = (file:string[]) =>{
        const filnal:any[] = []
        for(let i = 0; i < file.length; i++){
            if(file[i].startsWith('import')){
                continue
            }
            filnal.push(file[i].replace(/export default/g, '').replace(/export/g, ''))
        }
        return filnal.join('\n')
    }
    const objects:any[] = []
    const dirs = await readdir(dirPath)
    for(let i = 0; i < dirs.length; i = i + 1){
        if(!dirs[i].endsWith('.ts')){
            continue;
        }
        const finalObject = await readFile(path.join(dirPath, dirs[i]), 'utf-8')
        objects.push(isImportLine(finalObject.split('\n')))
    }
    return objects.join()
}

(async() => {
    const eventsDirePth = path.join(__dirname, 'src/events');
    const commandsDirePth = path.join(__dirname, 'src/commands');
    const custm_idDirePth = path.join(__dirname, 'src/custm_id');
    const typesDirePath = path.join(__dirname, 'src/types')
    const functionsDire = path.join(__dirname, 'src/functions')
    const connectionsDir = path.join(__dirname, 'src/connections')
    const tablsDir = path.join(__dirname, 'src/tables')
    const configFilPath = path.join(__dirname, 'src/config.json')
    const events = await getFileOpject(eventsDirePth)
    const commands = await getFileOpject(commandsDirePth)
    const custm_id = await getFileOpject(custm_idDirePth)
    const types = await getTypes(typesDirePath)
    const functions = await getFileOpject(functionsDire)
    const connections = await getFileOpject(connectionsDir)
    const tables = await getFileOpject(tablsDir)
    const intents = (await readFile('./src/handler/intents.ts', 'utf-8')).replace('export default', '')
    const botName = (await readFile('./src/handler/botName.ts', 'utf-8')).replace('export default', '').replace(/'/g, '').replace(' ', '')
    const configs:BotConfigType = JSON.parse((await readFile(configFilPath, 'utf-8')))
    var htmlFinal = ''
    configs.forEach(input => {
        if(input.inputType == 'textarea'){
            htmlFinal += `<div class="inputJsonFather ${input.inputType}" data-index="${input.index}" data-isMany="false" data-from="${input.from}">
    <div>
        <span>${input.isrRequire ? 'require *' : 'optional'}</span>
        <label>${input.inputTitle}</lable>
    </div>
    <textarea class="inputJson ${input.isrRequire ? 'requireInput' : 'optionalInput'}" data-for="${input.inputTitle}"></textarea>
</div>
`
        } else if(input.inputType == 'select'){
            htmlFinal += `<div class="inputJsonFather ${input.inputType}" data-index="${input.index}" data-isMany="false" data-from="${input.from}">
    <div>
        <span>${input.isrRequire ? 'require *' : 'optional'}</span>
        <label>${input.inputTitle}</lable>
    </div>
    <select class="inputJson ${input.isrRequire ? 'requireInput' : 'optionalInput'}" data-for="${input.inputTitle}">\n${
        input.options!.map(option => `      <option value="${option}">${option}</option>\n`).join("")
    }    </select>
</div>
`
        } else if(input.content instanceof Array){
            htmlFinal += `<div class="inputJsonFather ${input.inputType}" data-index="${input.index}" data-isMany="true" data-from="${input.from}">
    <div data-input="many">
        <div>
            <span>${input.isrRequire ? 'require *' : 'optional'}</span>
            <label>${input.inputTitle}</lable>
        </div>
        <input class="inputJson requireInput" type=${input.inputType} data-for="${input.inputTitle}">
    </div>
    <button class="plus"><i class="fas fa-plus"></i></button>
    <button class="noPlus"><i class="fas fa-minus"></i></button>
</div>
`
        } else {
            htmlFinal += `<div class="inputJsonFather ${input.inputType}" data-index="${input.index}" data-isMany="false" data-from="${input.from}">
    <div>
        <span>${input.isrRequire ? 'require *' : 'optional'}</span>
        <label>${input.inputTitle}</lable>
    </div>
    <input class="inputJson ${input.isrRequire ? 'requireInput' : 'optionalInput'}" type=${input.inputType} data-for="${input.inputTitle}">
</div>
`
        }
    })
    const outFile =
`
import discord from 'discord.js'
import discordModals from "discord-modals";
import  sequelize  from 'sequelize'
import path from 'path'
import config from './data/${botName}.json'
const botName = '${botName}';

process.on('uncaughtException', err => {
    console.log(err)
});


(() => {

${glopalVariables}

${types}

${functions}

${connections}

${tables}

class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}
class Custom_id {
    id;
    run;
    constructor(
        id:string,
        run: CustmIdFunction
    ){
        this.id = id,
        this.run = run
    }
}

class Event<Key extends keyof discord.ClientEvents> {
    constructor(
        public event: Key,
        public run: (...args: discord.ClientEvents[Key]) => any
    ) {}
}


const functions = {
    events:[${events}],
    custm_id:[${custm_id}],
    commands:[${commands}],
}

class Bot  extends discord.Client{
    commands: discord.Collection<string, CommandType> = new discord.Collection();
    constructor(){
        super({
            intents: ${intents}
        })
    }

    async start() {
        try{
            await connection.sync({
                logging:false,
            })
            console.log('database connected')
        } catch(err){
            console.log(err)
            console.log('database err')
            return
        }
        discordModals(this);
        await this.injectEveryThing();
        await this.login(config[0].content);
    }


    async addCommands({commands}:RegisterCommandsOptionsType){
        await this.application!.commands.set(commands)
        console.log('command added')
    }

    async injectEveryThing(){
        const slashCommands: discord.ApplicationCommandDataResolvable[] = [];
        functions.commands.forEach(async (command:any) => {
            this.commands.set(command.name, command);
            slashCommands.push(command);
        })
        this.on("ready", async() => {
            await this.addCommands({
                commands: slashCommands,
            });
        })
        functions.events.forEach(async (event:any) => {
            this.on(event.event, event.run);
        })
 
        
        this.on('interactionCreate', (interaction:any) => {
            functions.custm_id.forEach(async(id:any) => {
                if((interaction.customId == id.id)){
                    const params:RunOptions = {
                        client:this,
                        interaction:interaction,
                        args:interaction.options as discord.CommandInteractionOptionResolver
                    }
                    id.run(params)
                }
            })
        })
    }
}

const client = new Bot()

const main = async() => {
    await client.start()
    console.log('bot started')
}
main()

})()
`
await writeFile(path.join(__dirname, '../tester/final.ts'), outFile, 'utf-8')
await writeFile(path.join(__dirname, '../tester/htmlContent.html'), htmlFinal, 'utf-8')
await writeFile(path.join(__dirname, `../tester/t/data/${botName}.json`), JSON.stringify(configs), 'utf-8')
})()
