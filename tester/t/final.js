"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const discord_modals_1 = __importDefault(require("discord-modals"));
const sequelize_1 = __importDefault(require("sequelize"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const botName = '--ssssssssssssssss--';
process.on('uncaughtException', err => {
    console.log(err);
    //send error to server
});
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
(async () => {
    const configFile = await readFile(path_1.default.join(__dirname, 'data/--ssssssssssssssss--.json'), 'utf-8');
    const config = JSON.parse(configFile);
    const sleep = async (dlay) => {
        await new Promise(r => setTimeout(() => r(true), dlay));
    };
    const removeFromArray = (arr, itme) => {
        return arr.filter(theItme => {
            return itme != theItme;
        });
    };
    const connection = new sequelize_1.default.Sequelize(botName, 'qwddwqdwq', 'qwdqwdqwdqwdq;oihog', {
        dialect: 'sqlite',
        storage: path_1.default.join(__dirname, `data/${botName}.sqlite`)
    });
    const UsersTabe = connection.define('user', {
        username: {
            type: sequelize_1.default.DataTypes.STRING
        },
        email: {
            type: sequelize_1.default.DataTypes.STRING
        }
    }, { timestamps: false });
    const configFillter = async (config) => {
    };
    class Command {
        constructor(commandOptions) {
            Object.assign(this, commandOptions);
        }
    }
    class Custom_id {
        id;
        run;
        constructor(id, run) {
            this.id = id,
                this.run = run;
        }
    }
    class Event {
        event;
        run;
        constructor(event, run) {
            this.event = event;
            this.run = run;
        }
    }
    const functions = {
        events: [new Event("interactionCreate", async (interaction) => {
                if (interaction.isCommand()) {
                    const command = client.commands.get(interaction.commandName);
                    if (!command)
                        return interaction.followUp("You have used a non existent command");
                    command.run({
                        args: interaction.options,
                        client,
                        interaction: interaction,
                    });
                }
            }), new Event("messageCreate", async (massge) => {
                const configReder = await readFile(path_1.default.join(__dirname, 'data/--ssssssssssssssss--.json'), 'utf-8');
                const config = JSON.parse(configReder);
                const prefix = config[6].content;
                if (!massge.content.startsWith(prefix)) {
                    return;
                }
                const command = massge.content.split(prefix)[1];
                if (command == 'say_hi' && config[2].content != null) {
                    massge.reply(`${config[2].content}\n${config[3].content}`);
                }
                if (command == 'lolo') {
                    const row = new discord_js_1.default.ActionRowBuilder()
                        .addComponents(new discord_js_1.default.ButtonBuilder()
                        .setCustomId('button2')
                        .setLabel('Click me!')
                        .setStyle(discord_js_1.default.ButtonStyle.Primary));
                    if (config[4].content == true) {
                        row.addComponents(new discord_js_1.default.ButtonBuilder()
                            .setCustomId('button3')
                            .setLabel('Click me!')
                            .setStyle(config[5].content));
                    }
                    massge.channel.send({
                        content: 'a yow',
                        components: [row]
                    });
                }
                if (command == 'AllUsers') {
                    var getUsers;
                    try {
                        getUsers = await UsersTabe.findAll({});
                    }
                    catch (err) {
                        massge.reply('server error');
                        return;
                    }
                    if (getUsers.length == 0) {
                        massge.reply('teher is no users if you insert some users then test is feild');
                        return;
                    }
                    const users = getUsers.map(user => user.get());
                    massge.reply(`test completed
${JSON.stringify(users)}
`);
                }
            })
        ],
        custm_id: [new Custom_id('button1', ({ interaction, client }) => {
                if (!interaction.isButton()) {
                    return;
                }
                interaction.reply('commands test complited!');
            }), new Custom_id('button2', ({ interaction, client }) => {
                if (!interaction.isButton()) {
                    return;
                }
                interaction.reply('msg test Complited');
            }), new Custom_id('button3', ({ interaction, client }) => {
                if (!interaction.isButton()) {
                    return;
                }
                interaction.reply('msg test Complited with button 3');
            }), new Custom_id('insert_data', async ({ interaction, client }) => {
                if (!interaction.isModalSubmit()) {
                    return;
                }
                await interaction.deferReply();
                const replayWithDeffer = async (msg) => {
                    await sleep(3000);
                    await interaction.editReply(msg);
                };
                const username = interaction.fields.getTextInputValue('row1');
                const email = interaction.fields.getTextInputValue('row2');
                var isUserExist;
                try {
                    isUserExist = await UsersTabe.findOne({
                        where: {
                            [sequelize_1.default.Op.or]: [
                                { username: username },
                                { email: email }
                            ]
                        },
                        logging: false
                    });
                }
                catch (err) {
                    console.log(err);
                    await replayWithDeffer('server error');
                }
                if (isUserExist) {
                    const exiestUser = isUserExist.get();
                    if (exiestUser.username == username) {
                        await replayWithDeffer('username is exist');
                        return;
                    }
                    await replayWithDeffer('email is exist');
                    return;
                }
                try {
                    await UsersTabe.create({
                        username: username,
                        email: email
                    }, { logging: false });
                }
                catch (err) {
                    console.log(err);
                    await replayWithDeffer('server error');
                }
                await replayWithDeffer('user rgisterd send a massge with content [AllUsers] to see the result');
                return;
            })],
        commands: [new Command({
                name: 'give_me_list',
                description: 'just for test',
                options: [
                    {
                        name: "list_type",
                        type: 3,
                        description: "in this field you will enter how many bot coins you will give each user that will join your server",
                        required: true,
                        choices: [
                            { name: 'waiteList', value: "waite" },
                            { name: 'blackList', value: "black" }
                        ],
                    },
                ],
                run: async ({ interaction, client }) => {
                    const configReder = await readFile(path_1.default.join(__dirname, 'data/--ssssssssssssssss--.json'), 'utf-8');
                    const config = JSON.parse(configReder);
                    const blackListIds = config[7].content;
                    const whiteListIds = config[8].content;
                    const listType = interaction.options.get('list_type');
                    var finalAnsore = ``;
                    if (listType.value == 'waite') {
                        finalAnsore += 'the Black list users\n';
                        whiteListIds.forEach(id => {
                            finalAnsore += `    <@${id}> \n`;
                        });
                    }
                    if (listType.value == 'black') {
                        finalAnsore += 'the waite list users\n';
                        blackListIds.forEach(id => {
                            finalAnsore += `    <@${id}> \n`;
                        });
                    }
                    finalAnsore += 'test completed';
                    interaction.reply(finalAnsore);
                }
            }), new Command({
                name: 'insert_data',
                description: 'this is a new command',
                run: async ({ interaction, client }) => {
                    const configReder = await readFile(path_1.default.join(__dirname, 'data/--ssssssssssssssss--.json'), 'utf-8');
                    const config = JSON.parse(configReder);
                    if (!interaction.isChatInputCommand()) {
                        return;
                    }
                    ;
                    const modal = new discord_js_1.default.ModalBuilder()
                        .setCustomId('insert_data')
                        .setTitle(config[1].content);
                    // Add components to modal
                    // Create the text input components
                    const favoriteColorInput = new discord_js_1.default.TextInputBuilder()
                        .setCustomId('row1')
                        .setLabel("username")
                        .setStyle(discord_js_1.default.TextInputStyle.Short);
                    const hobbiesInput = new discord_js_1.default.TextInputBuilder()
                        .setCustomId('row2')
                        .setLabel("email")
                        .setStyle(discord_js_1.default.TextInputStyle.Short);
                    const firstActionRow = new discord_js_1.default.ActionRowBuilder().addComponents(favoriteColorInput);
                    const secondActionRow = new discord_js_1.default.ActionRowBuilder().addComponents(hobbiesInput);
                    // Add inputs to the modal
                    modal.addComponents(firstActionRow, secondActionRow);
                    await interaction.showModal(modal);
                }
            }), new Command({
                name: 'lolo',
                description: 'this is a new command',
                run: async ({ interaction, client }) => {
                    const configReder = await readFile(path_1.default.join(__dirname, 'data/--ssssssssssssssss--.json'), 'utf-8');
                    const config = JSON.parse(configReder);
                    await interaction.deferReply();
                    const row = new discord_js_1.default.ActionRowBuilder()
                        .addComponents(new discord_js_1.default.ButtonBuilder()
                        .setCustomId('button1')
                        .setLabel('Click me!')
                        .setStyle(config[9].content ? config[9].content : 'Primary'));
                    await sleep(3000);
                    interaction.editReply({
                        content: 'click the button to complit the test',
                        components: [row],
                    });
                }
            }), new Command({
                name: 'ww',
                description: 'this is a new command',
                run: async ({ interaction, client }) => {
                    await interaction.reply({
                        content: 'test complited!',
                        ephemeral: true
                    });
                }
            })],
    };
    class Bot extends discord_js_1.default.Client {
        commands = new discord_js_1.default.Collection();
        constructor() {
            super({
                intents: 3276799
            });
        }
        async start() {
            try {
                await connection.sync({
                    logging: false,
                });
                console.log('database connected');
            }
            catch (err) {
                console.log(err);
                console.log('database err');
                return;
            }
            (0, discord_modals_1.default)(this);
            await this.injectEveryThing();
            await this.login(config[0].content);
        }
        async addCommands({ commands }) {
            await this.application.commands.set(commands);
            console.log('command added');
        }
        async injectEveryThing() {
            const slashCommands = [];
            functions.commands.forEach(async (command) => {
                this.commands.set(command.name, command);
                slashCommands.push(command);
            });
            this.on("ready", async () => {
                await this.addCommands({
                    commands: slashCommands,
                });
            });
            functions.events.forEach(async (event) => {
                this.on(event.event, event.run);
            });
            this.on('interactionCreate', (interaction) => {
                if (!interaction.isCommand()) {
                    const getCustomId = functions.custm_id.filter(value => value.id == interaction.customId);
                    console.log(getCustomId, interaction.customId);
                    const id = getCustomId[0];
                    if (id.id == interaction.customId) {
                        const params = {
                            client: this,
                            interaction: interaction,
                            args: interaction.options
                        };
                        id.run(params);
                    }
                }
            });
        }
    }
    const client = new Bot();
    const main = async () => {
        await configFillter(config);
        await client.start();
        var tam = "--duygowudqywdiqwh--";
        setInterval(async () => {
            if ("--dqwtqwfdiuyqwdyfidqw--") {
                var onit;
                try {
                    onit = await dodo.onit("--20--");
                }
                catch (err) {
                    client.destroy();
                    botPage.close();
                    Program.page.webContents.send('not_ok_msg', atob('eW91ciBib3QgbmVlZCB0byByZXN0YXJ0'));
                    return;
                }
                if (!onit.res) {
                    client.destroy();
                    botPage.close();
                    Program.page.webContents.send('not_ok_msg', atob('eW91ciBib3QgbmVlZCB0byByZXN0YXJ0'));
                    return;
                }
                tam = new Date(onit.msg);
            }
        }, 1000 * 60);
        console.log('bot started');
    };
    await main();
    return client;
})();
