import { Like } from "../models/Like.js";
import { Event } from "../models/Event.js";

export const likeEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    console.log(userId, eventId);

    try {
        const existingLike = await Like.findOne({ where: { userId, eventId } });
        if (existingLike) {
            return res.status(200).json({ message: 'Ya has dado like a este evento' });
        }

        const newLike = await Like.create({ userId, eventId });
        res.status(201).json(newLike);

    } catch (error) {
        res.status(500).json({ message: 'Error al dar like', error });
    }
};

export const unlikeEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const like = await Like.findOne({ where: { userId, eventId } });
        if (!like) {
            return res.status(200).json({ message: 'No has dado like a este evento' });
        }

        await Like.destroy({ where: { userId, eventId } });
        res.status(200).json({ message: 'Like eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al quitar like', error });
    }
};

export const getUserLikedEvents = async (req, res) => {
    const { userId } = req.params;

    try {
        const likes = await Like.findAll({
            where: { userId },
            attributes: ['eventId']
        });

        if (!likes.length) {
            return res.status(200).json({ message: 'No has dado like a ningún evento' });
        }

        const eventIds = likes.map(like => like.eventId);

        const events = await Event.findAll({
            where: {
                id: eventIds
            }
        });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener eventos liked', error });
    }
};
