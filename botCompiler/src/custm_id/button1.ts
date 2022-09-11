import { Custom_id } from "../handler/custom_id";
export default new Custom_id('button1', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    interaction.reply('commands test complited!')
})