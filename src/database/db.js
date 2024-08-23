import Sequelize from 'sequelize';

export const sequelize = new Sequelize('dbanime', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
})
