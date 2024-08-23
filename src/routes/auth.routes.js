import { Router } from "express";
import { verifyToken } from "../middlewares/validateToken.js";
import * as Auth from "../controllers/auth.controller.js"

const router = Router()

router.post('/register', Auth.register)
router.post('/login', Auth.login)
router.post('/logout', Auth.logout)
router.get('/profile', verifyToken, Auth.profile)
router.get('/verify', Auth.verify)

export default router