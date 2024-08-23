import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./User.js";
import { Event } from "./Event.js";
import { Ticket } from "./Ticket.js";

export const Purchase = sequelize.define('purchase', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'id'
        },
        allowNull: false
    },
    ticketId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ticket,
            key: 'id'
        },
        allowNull: false
    },
    remainingAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    }
});

// Asociaciones
User.hasMany(Purchase, { foreignKey: 'userId' });
Event.hasMany(Purchase, { foreignKey: 'eventId' });
Ticket.hasMany(Purchase, { foreignKey: 'ticketId' });

Purchase.belongsTo(User, { foreignKey: 'userId' });
Purchase.belongsTo(Event, { foreignKey: 'eventId' });
Purchase.belongsTo(Ticket, { foreignKey: 'ticketId' });
