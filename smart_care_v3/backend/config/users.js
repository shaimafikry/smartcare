// backend/config/createUsersTable.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // assuming you have a db config file for Sequelize instance

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    national_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = { User };
