import { Router } from "express";

import * as TiketsCtrl from "../controllers/ticket.controller.js";

const router = Router()

router.post('/purchase', TiketsCtrl.purchaseTicket)
router.get('/tickets', TiketsCtrl.getAllTickets)
router.post('/tickets', TiketsCtrl.createTicketsForEvent)
router.get('/tickets/:eventId', TiketsCtrl.getTicketsByEvent);
router.get('/tickets/user/:userId', TiketsCtrl.getTicketsByUser);

export default router;