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
    session_id: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    department: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const UserPhone = sequelize.define('UserPhone', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: false
});

// Association
User.hasMany(UserPhone, { foreignKey: 'user_id' });
UserPhone.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, UserPhone };
