import { Event } from "../models/Event.js";
import saveImage from "../utils/cloudinary.js";
import { sequelize } from "../database/db.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        return res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los eventos' });
    }
};

export const getPopularEvents = async (req, res) => {
    try {
        const popularEvents = await Event.findAll({
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM \`likes\` AS \`like\`
                            WHERE \`like\`.\`eventId\` = \`event\`.\`id\`
                        )`),
                        'likeCount'
                    ]
                ]
            },
            order: [[sequelize.literal('likeCount'), 'DESC']],
            limit: 5 // Limit the number of popular events to return
        });

        res.status(200).json(popularEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular events', error });
    }
};

export const getEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        if (event) {
            return res.json(event);
        } else {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el evento' });
    }
};

export const createEvent = async (req, res) => {
    const { title, desc, date, location, status, userId } = req.body;

    console.log(req.body)
    console.log(req.file.path)

    const path = req.file.path;

    try {
        const imageUrl = await saveImage(path);
        const event = await Event.create({
            title,
            desc,
            cover: imageUrl,
            date,
            location,
            status,
            userId
        });
        return res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el evento' });
    }
};


export const updatedEvent = async (req, res) => {
    const { id } = req.params;
    const { title, desc, date, location, cover, status } = req.body;

    try {
        const [updated] = await Event.update(
            {
                title,
                desc,
                date,
                location,
                cover,
                status
            },
            { where: { id } }
        );

        if (updated) {
            const updatedEvent = await Event.findByPk(id);
            return res.json(updatedEvent);
        } else {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el evento' });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Event.destroy({ where: { id } });

        if (deleted) {
            return res.send('Eliminado exitosamente');
        } else {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
};

export const getEventsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const events = await Event.findAll({
            where: { userId }
        });

        if (events.length > 0) {
            return res.json(events);
        } else {
            return res.status(404).json({ error: 'No events found for this user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching events for this user' });
    }
};
