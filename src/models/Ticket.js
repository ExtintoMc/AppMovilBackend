import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { Event } from "./Event.js";

export const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'events',
            key: 'id'
        },
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Event.hasMany(Ticket, { foreignKey: 'eventId' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });
