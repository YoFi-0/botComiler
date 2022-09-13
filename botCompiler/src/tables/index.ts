import {connection} from '../connections'
import sequelize from 'sequelize'
export const UsersTabe = connection.define('user', {
    username:{
        type:sequelize.DataTypes.STRING
    }, 
    email:{
        type:sequelize.DataTypes.STRING
    }
}, {timestamps: false})
