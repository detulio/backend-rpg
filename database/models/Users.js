const Sequelize = require('sequelize');
const database = require('../db');

const bcrypt = require('bcrypt');

const Users = database.define('produto', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Users.beforeCreate( async (data, options) => {
    const salt = await bcrypt.genSalt(10); //whatever number you want
    data.password = await bcrypt.hash(data.password, salt);
})

Users.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = Users;