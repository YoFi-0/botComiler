"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const discord_modals_1 = __importDefault(require("discord-modals"));
const sequelize_1 = __importDefault(require("sequelize"));
const path_1 = __importDefault(require("path"));
const config_json_1 = __importDefault(require("../config.json"));
(() => {
    const sleep = async (dlay) => {
        await new Promise(r => setTimeout(() => r(true), dlay));
    };
    const connection = new sequelize_1.default.Sequelize('bolabola', 'qwddwqdwq', 'qwdqwdqwdqwdqoihog', {
        dialect: 'sqlite',
        host: path_1.default.join(__dirname, `../data/coma.sqlite`)
    });
    const UsersTabe = connection.define('user', {
        username: {
            type: sequelize_1.default.DataTypes.STRING
        },
        email: {
            type: sequelize_1.default.DataTypes.STRING
        }
    }, { timestamps: false });
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
                if (massge.content == 'lolo') {
                    const row = new discord_js_1.default.ActionRowBuilder()
                        .addComponents(new discord_js_1.default.ButtonBuilder()
                        .setCustomId('button2')
                        .setLabel('Click me!')
                        .setStyle(discord_js_1.default.ButtonStyle.Primary));
                    if (config_json_1.default[3].content == true) {
                        row.addComponents(new discord_js_1.default.ButtonBuilder()
                            .setCustomId('button3')
                            .setLabel('Click me!')
                            .setStyle(config_json_1.default[4].content));
                    }
                    massge.channel.send({
                        content: 'a yow',
                        components: [row,]
                    });
                }
                if (massge.content == 'AllUsers') {
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
            })],
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
                name: 'insert_data',
                description: 'this is a new command',
                run: async ({ interaction, client }) => {
                    if (!interaction.isChatInputCommand()) {
                        return;
                    }
                    const modal = new discord_js_1.default.ModalBuilder()
                        .setCustomId('insert_data')
                        .setTitle(config_json_1.default[1].content);
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
                    await interaction.deferReply();
                    const row = new discord_js_1.default.ActionRowBuilder()
                        .addComponents(new discord_js_1.default.ButtonBuilder()
                        .setCustomId('button1')
                        .setLabel('Click me!')
                        .setStyle(config_json_1.default[2].content ? config_json_1.default[2].content : 'Primary'));
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
                    await interaction.reply('test complited!');
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
                    force: true
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
            await this.login(config_json_1.default[0].content);
        }
        async addCommands({ commands }) {
            this.application?.commands.set(commands);
            console.log('commands added');
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
                functions.custm_id.forEach(async (id) => {
                    if ((interaction.customId == id.id)) {
                        const params = {
                            client: this,
                            interaction: interaction,
                            args: interaction.options
                        };
                        id.run(params);
                    }
                });
            });
        }
    }
    const client = new Bot();
    const main = async () => {
        await client.start();
        console.log('bot started');
    };
    main();
})();
