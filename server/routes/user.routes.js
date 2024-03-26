import { Router } from "express";
import usercontroller from "../controllers/user.controller.js";
const {register, login , logout , getProfile} = usercontroller;
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',isLoggedIn, getProfile); 

export default router;
