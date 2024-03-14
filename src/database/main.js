import { Sequelize } from 'sequelize';
import { Message } from './models/message.js';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlitedb/db.sqlite'
});


const db = {
    Message: Message(sequelize)
};
// await sequelize.sync({ force: true });


export {
    db
};