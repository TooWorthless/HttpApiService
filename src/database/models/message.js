import { DataTypes } from 'sequelize';


function Message(sequelize) {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT
        },
        receiver: {
            type: DataTypes.STRING,
            defaultValue: 'everyone'
        }
    }, { modelName: 'Message' });

    return Message;
}


export { 
    Message 
};