import { sleep } from "../functions";
import sequelize from "sequelize";
import { Custom_id } from "../handler/custom_id";
import {UsersTabe} from '../tables'
import { DB_Users } from "../types";
export default new Custom_id('insert_data', async({interaction, client}) => {
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
})