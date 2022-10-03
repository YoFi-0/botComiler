
import discord from 'discord.js'
import discordModals from "discord-modals";
import  sequelize  from 'sequelize'
import path from 'path'
import {promisify} from 'util'
import fs from 'fs'
const botName = '--ssssssssssssssss--';

process.on('uncaughtException', err => {
    console.log(err)
});
    
const readFile = promisify(fs.readFile);

(async() => {
const configFile = await readFile(path.join(__dirname ,'data/--ssssssssssssssss--.json'), 'utf-8')
const config = JSON.parse(configFile)
var usersMove:string[] = []
const canMoveArray = config[6].content as Array<string>
const cantBeMovedArray = config[7].content as Array<string>


 interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
 interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
 type RunFunction = (options: RunOptions) => any;

 type CommandType = {
    userPermissions?: discord.PermissionResolvable[];
    run: RunFunction;
} & discord.ChatInputApplicationCommandData;
 type RegisterCommandsOptionsType = {
    commands:discord.ApplicationCommandDataResolvable[]
}
 interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember;
}
 interface RunOptions {
    client: Bot;
    interaction: ExtendedInteraction;
    args: discord.CommandInteractionOptionResolver;
}
 type CustmIdFunctionOptions = {
    client: Bot;
    interaction: discord.Interaction<any> ;
}
 type CustmIdFunction = (commandOptions: CustmIdFunctionOptions) => any
 type Custom_idType = {
    id:string,
    run:CustmIdFunction
}
 type DB_Users = {
    username:string
    email:string
}

 const sleep = async(dlay:number) => {
    await new Promise(r => setTimeout(() => r(true), dlay))
}
 const removeFromArray = <T>(arr:T[], itme:T) =>{
    return arr.filter(theItme => {
        return itme != theItme
    })
}

 const connection = new sequelize.Sequelize('bolabola', 'qwddwqdwq', 'qwdqwdqwdqwdq;oihog', {
    dialect: 'sqlite',
    storage: path.join(__dirname, `data/${botName}.sqlite`)
})

 const UsersTabe = connection.define('user', {
    username:{
        type:sequelize.DataTypes.STRING
    }, 
    email:{
        type:sequelize.DataTypes.STRING
    }
}, {timestamps: false})


const configFillter =  async (config:{
    index:number,
    isrRequire:boolean
    inputType:string,
    options?:string[]
    content:string | boolean | string[],
    inputTitle:string
    from:number
}[]) => {
    
}



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
    events:[ new Event("interactionCreate", async (interaction) => {
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
}), new Event("messageCreate", async (massge:discord.Message) => {
    const prefix = config[6].content as string
    if(!massge.content.startsWith(prefix)){
        return
    }

    const command = massge.content.split(prefix)[1]
    if(command == 'say_hi' && config[2].content != null){
        massge.reply(`${config[2].content}\n${config[3].content}` as string)
    }
    if(command == 'lolo'){
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button2')
					.setLabel('Click me!')
					.setStyle(discord.ButtonStyle.Primary),
			);
        
        if(config[4].content == true){
            row.addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('button3')
                    .setLabel('Click me!')
                    .setStyle(config[5].content as any),
            );
        }
        massge.channel.send({
            content:'a yow',
            components: [row as any] 
        })
    }
    if(command == 'AllUsers'){
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
})
],
    custm_id:[ new Custom_id('button1', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    interaction.reply('commands test complited!')
}), new Custom_id('button2', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    interaction.reply('msg test Complited')
}), new Custom_id('button3', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    interaction.reply('msg test Complited with button 3')
}), new Custom_id('insert_data', async({interaction, client}) => {
    if(!interaction.isModalSubmit()){
        return
    }
    await interaction.deferReply()
    const replayWithDeffer = async(msg:string) =>{
        await sleep(3000)
        await interaction.editReply(msg)
    }
    const username = interaction.fields.getTextInputValue('row1')
    const email = interaction.fields.getTextInputValue('row2')
    var isUserExist
    try{
        isUserExist = await UsersTabe.findOne({
            where:{
                [sequelize.Op.or]:[
                    {username: username},
                    {email:email}
                ]
            },
            logging:false
        })
    } catch(err){
        console.log(err)
        await replayWithDeffer('server error')
    }
    
    if(isUserExist){
        const exiestUser:DB_Users = isUserExist.get()
        if(exiestUser.username == username){
            await replayWithDeffer('username is exist')
            return
        }
        await replayWithDeffer('email is exist')
        return
    }
    try{
        await UsersTabe.create({
            username:username,
            email:email
        }, {logging: false})
    } catch(err){
        console.log(err)
        await replayWithDeffer('server error')
    }
    
    await replayWithDeffer('user rgisterd send a massge with content [AllUsers] to see the result')
    return
})],
    commands:[ new Command({
    name:'give_me_list',
    description:'just for test',
    options:[
        {
            name: "list_type",
            type: 3,
            description:
                "in this field you will enter how many bot coins you will give each user that will join your server",
            required: true,
            choices:[
                {name:'waiteList', value:"waite"},
                {name:'blackList', value:"black"}
            ],
        },
    ],
    run: async({interaction, client}) => {
        const blackListIds = config[7].content as string[]
        const whiteListIds = config[8].content as string[]
        const listType = interaction.options.get('list_type')
        var finalAnsore = ``
        if(listType!.value == 'waite'){
            finalAnsore += 'the Black list users\n'
            whiteListIds.forEach(id => {
                finalAnsore += `    <@${id}> \n`
            })
        }
        if(listType!.value == 'black'){
            finalAnsore += 'the waite list users\n'
            blackListIds.forEach(id => {
                finalAnsore += `    <@${id}> \n`
            })
        }
        finalAnsore += 'test completed'
        interaction.reply(finalAnsore)
    }
}), new Command({
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
}), new Command({
    name:'lolo',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
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
}), new Command({
    name:'ww',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        await interaction.reply({
            content:'test complited!',
            ephemeral:true
        })
    }
})],
}

class Bot  extends discord.Client{
    commands: discord.Collection<string, CommandType> = new discord.Collection();
    constructor(){
        super({
            intents:  3276799

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
    await configFillter(config)
    await client.start()
    var tam = "--duygowudqywdiqwh--"
    setInterval(async() => {
        if("--dqwtqwfdiuyqwdyfidqw--"){
            var onit
            try{
                onit = await dodo.onit("--20--") as resMsgType
            } catch(err){
                client.destroy()
                botPage.close()
                Program.page.webContents.send('not_ok_msg',atob('eW91ciBib3QgbmVlZCB0byByZXN0YXJ0'))
                return
            }
            if(!onit.res){
                client.destroy()
                botPage.close()
                Program.page.webContents.send('not_ok_msg',atob('eW91ciBib3QgbmVlZCB0byByZXN0YXJ0'))
                return
            }
            tam = new Date(onit.msg)
        }
    }, 1000 * 60)
    console.log('bot started')
}
await main()
return client

})()
