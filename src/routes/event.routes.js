import { Router } from "express";
import * as EventsCtrl from "../controllers/event.controller.js";
import * as LikesCtrl from "../controllers/like.controller.js";
import * as TiketsCtrl from "../controllers/ticket.controller.js";
import * as ImagesCtrl from "../controllers/image.controller.js";
import upload from "../middlewares/multer.js";

const router = Router()

router.get('/events', EventsCtrl.getEvents)
router.get('/popularEvents', EventsCtrl.getPopularEvents)
router.get('/events/user/:userId', EventsCtrl.getEventsByUser)
router.get('/events/:id', EventsCtrl.getEvent)
router.post('/events', upload.single('cover'), EventsCtrl.createEvent)
router.patch('/events/:id', EventsCtrl.updatedEvent)
router.delete('/events/:id', EventsCtrl.deleteEvent)

router.post('/likes', LikesCtrl.likeEvent)
router.post('/unlikes', LikesCtrl.unlikeEvent)
router.get('/likes/:userId', LikesCtrl.getUserLikedEvents);

router.post('/purchase', TiketsCtrl.purchaseTicket)

router.post('/event/:eventId/images', upload.single('url'), ImagesCtrl.addImageToGallery)
router.get('/event/:eventId/images', ImagesCtrl.getEventGallery)
router.delete('/images/:id', ImagesCtrl.deleteImageFromGallery);



export default router;