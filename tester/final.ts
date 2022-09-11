
import discord from 'discord.js'
import discordModals from "discord-modals";
import  sequelize  from 'sequelize'
import path from 'path'
import config from '../config.json'

(() => {

 interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember
}
 interface RunOptions {
    client: Bot
    interaction: ExtendedInteraction
    args: discord.CommandInteractionOptionResolver
}
 type RunFunction = (options: RunOptions) => any

 type CommandType = {
    userPermissions?: discord.PermissionResolvable[]
    run: RunFunction
} & discord.ChatInputApplicationCommandData
 type RegisterCommandsOptionsType = {
    commands:discord.ApplicationCommandDataResolvable[]
}
 interface ExtendedInteraction extends discord.CommandInteraction {
    member: discord.GuildMember
}
 interface RunOptions {
    client: Bot
    interaction: ExtendedInteraction
    args: discord.CommandInteractionOptionResolver
}
 type CustmIdFunctionOptions = {
    client: Bot
    interaction: discord.Interaction<any> 
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

 const connection = new sequelize.Sequelize('bolabola', 'qwddwqdwq', 'qwdqwdqwdqwdqoihog', {
    dialect: 'sqlite',
    storage: path.join(__dirname, `../data/coma.sqlite`)
})

 const UsersTabe = connection.define('user', {
    username:{
        type:sequelize.DataTypes.STRING
    }, 
    email:{
        type:sequelize.DataTypes.STRING
    }
}, {timestamps: false})


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
        const command = client.commands.get(interaction.commandName)
        if (!command)
            return interaction.followUp("You have used a non existent command")

        command.run({
            args: interaction.options as discord.CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        })
    }
}), new Event("messageCreate", async (massge:discord.Message) => {
    if(massge.content == 'lolo'){
        const row = new discord.ActionRowBuilder()
			.addComponents(
				new discord.ButtonBuilder()
					.setCustomId('button2')
					.setLabel('Click me!')
					.setStyle(discord.ButtonStyle.Primary),
			)
        
        if(config[3].content == true){
            row.addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('button3')
                    .setLabel('Click me!')
                    .setStyle(config[4].content as any),
            )
        }
        massge.channel.send({
            content:'a yow',
            components: [row as any, ] 
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
})],
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
    name:'insert_data',
    description: 'this is a new command',
    run: async({interaction, client}) =>{
        if (!interaction.isChatInputCommand()) {
            return
        }
        const modal = new discord.ModalBuilder()
			.setCustomId('insert_data')
			.setTitle(config[1].content as string)

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new discord.TextInputBuilder()
			.setCustomId('row1')
			.setLabel("username")
			.setStyle(discord.TextInputStyle.Short)

		const hobbiesInput = new discord.TextInputBuilder()
			.setCustomId('row2')
			.setLabel("email")
			.setStyle(discord.TextInputStyle.Short)
		const firstActionRow = new discord.ActionRowBuilder().addComponents(favoriteColorInput) as discord.ActionRowBuilder<discord.TextInputBuilder>
		const secondActionRow = new discord.ActionRowBuilder().addComponents(hobbiesInput) as discord.ActionRowBuilder<discord.TextInputBuilder>

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow)

        await interaction.showModal(modal)
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
					.setStyle(config[2].content ? config[2].content : 'Primary' as any),
			)
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
        await interaction.reply('test complited!')
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
                force:true
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
        this.application?.commands.set(commands);
        console.log('commands added')
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
