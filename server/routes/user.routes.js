import { Router } from "express";
import usercontroller from "../controllers/user.controller.js";
const {register, login , logout , getProfile, forgotPassword, resetPassword , changePassword,updateUser} = usercontroller;
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from '../middlewares/multer.middleware.js'

const router = Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',isLoggedIn, getProfile); 
router.post('/reset',forgotPassword)
router.post('/reset/:resetTOkrn', resetPassword)
router.post('/change-password', isLoggedIn , changePassword)
router.post('/update/:id' , isLoggedIn , upload.single('avatar') , updateUser)

export default router;
