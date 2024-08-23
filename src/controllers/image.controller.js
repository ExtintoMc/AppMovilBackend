import { Image } from "../models/Image.js";
import { Event } from "../models/Event.js";

export const addImageToGallery = async (req, res) => {
    const { eventId, url } = req.body;

    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const image = await Image.create({ eventId, url });
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar imagen', error });
    }
};

export const getEventGallery = async (req, res) => {
    const { eventId } = req.params;

    try {
        const images = await Image.findAll({ where: { eventId } });
        if (!images.length) {
            return res.status(404).json({ message: 'No se encontraron imágenes para este evento' });
        }

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la galería', error });
    }
};

export const deleteImageFromGallery = async (req, res) => {
    const { id } = req.params;

    try {
        const image = await Image.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: 'Imagen no encontrada' });
        }

        await image.destroy();
        res.status(200).json({ message: 'Imagen eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar imagen', error });
    }
};