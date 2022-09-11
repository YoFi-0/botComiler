import { Custom_id } from "../handler/custom_id";
export default new Custom_id('button3', ({interaction, client}) => {
    if(!interaction.isButton()){
        return
    }
    interaction.reply('msg test Complited with button 3')
})