import  sequelize  from 'sequelize'
import path from 'path'
export const connection = new sequelize.Sequelize('bolabola', 'qwddwqdwq', 'qwdqwdqwdqwdq;oihog', {
    dialect: 'sqlite',
    storage: path.join(__dirname, `../data/coma.sqlite`)
})