const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre es requerido' },
            len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Este email ya está registrado' },
        validate: {
            isEmail: { msg: 'Email inválido' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
