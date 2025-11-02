// Creating the routes
import express from "express";
import authController from "../controller/userController";
import { Authentication } from "../middleware/tokenVerificaton";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/userData", Authentication, authController.getUser);
router.post("/send-otp", authController.otpVerify);
router.post("/verify-account", authController.verifyEmail);
router.get("/is-auth", Authentication, authController.isAuthenticated);
router.post("/send-reset-otp", authController.resendOtp);
router.post("/reset-password", authController.resetPassword);

export default router;
