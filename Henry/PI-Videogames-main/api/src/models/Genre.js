const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.FLOAT,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
};