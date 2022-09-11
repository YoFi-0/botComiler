import  sequelize  from 'sequelize'
import path from 'path'
export const connection = new sequelize.Sequelize('bolabola', 'qwddwqdwq', 'qwdqwdqwdqwdq;oihog', {
    dialect: 'sqlite',
    host: path.join(__dirname, `../data/coma.sqlite`)
})