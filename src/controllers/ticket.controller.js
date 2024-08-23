import { Purchase } from "../models/Purchase.js";
import { Ticket } from "../models/Ticket.js";
import { Event } from "../models/Event.js";

export const purchaseTicket = async (req, res) => {
    const { userId, eventId, ticketId, quantity, paymentAmount } = req.body;

    console.log(req.body)

    try {
        const ticket = await Ticket.findByPk(ticketId);
        if (!ticket || ticket.eventId !== eventId) {
            return res.status(404).json({ message: 'Boleto o evento no encontrados' });
        }

        if (ticket.available < quantity) {
            return res.status(400).json({ message: 'No hay suficientes boletos disponibles' });
        }

        const totalAmount = ticket.price * quantity;

        let status = 'completed';
        let remainingAmount = 0;

        if (paymentAmount < totalAmount) {
            status = 'pending';
            remainingAmount = totalAmount - paymentAmount;
        }

        ticket.available -= quantity;
        await ticket.save();

        const purchase = await Purchase.create({
            userId,
            eventId,
            ticketId,
            quantity,
            status,
            remainingAmount
        });

        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la compra', error });
    }
};


export const createTicketsForEvent = async (req, res) => {
    const {
        type,
        price,
        quantity,
        available,
        eventId,
      } = req.body;

    console.log('aaaaaaaaaaaaa')
    console.log(req.body)
    console.log('aaaaaaaaaaaaa')

    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        console.log('entra')

        const createdTickets = await Ticket.create({ nombre:type, eventId, price, available, quantity })


        res.status(201).json(createdTickets);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tickets', error });
    }
};

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: {
                model: Event,
                attributes: ['title', 'date', 'location']
            }
        });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los boletos', error });
    }
};

export const getTicketsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const tickets = await Ticket.findAll({
            where: { eventId }
        });

        if (tickets.length === 0) {
            return res.status(200).json({ message: 'No se encontraron boletos para este evento' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los boletos', error });
    }
};

export const getTicketsByUser = async (req, res) => {
    const { userId } = req.params;

    try {

        const purchases = await Purchase.findAll({
            where: { userId },
            include: [
                {
                    model: Ticket,
                    attributes: ['id', 'price'],
                    include: {
                        model: Event,
                        attributes: ['title', 'desc', 'date', 'location', 'cover']
                    }
                }
            ]
        });

        console.log(purchases)

        if (purchases.length === 0) {
            return res.status(200).json({ message: 'No se encontraron boletos para este usuario' });
        }

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los boletos del usuario', error });
    }
};