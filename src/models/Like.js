import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import { User } from "./User.js";
import { Event } from "./Event.js";

export const Like = sequelize.define('like', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'events',
            key: 'id'
        },
        allowNull: false
    }
});

User.belongsToMany(Event, { through: Like });
Event.belongsToMany(User, { through: Like });
