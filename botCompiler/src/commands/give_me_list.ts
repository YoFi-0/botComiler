import {Command} from '../handler/commands'
import {promisify} from 'util'
import fs from 'fs'
import path from 'path'
import { BotConfigType } from '../types'
const readFile = promisify(fs.readFile)
export default new Command({
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
        const configReder = await readFile(path.join(__dirname, '../config.json'), 'utf-8')
        const config:BotConfigType = JSON.parse(configReder)
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
})