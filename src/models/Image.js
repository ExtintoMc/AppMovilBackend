import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Event } from "./Event.js";

export const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'events',
            key: 'id'
        },
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Asociación
Event.hasMany(Image, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Image.belongsTo(Event, { foreignKey: 'eventId' });
