// Creating the user controller function
import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";

class AuthUserController {
  private saltRounds: number;

  constructor(saltRounds: number = 12) {
    this.saltRounds = saltRounds;
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Name, email and password are required.",
        });
        return;
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "User already exists.",
        });
        return;
      }

      // Hashing the password
      const salt = await bcryptjs.genSalt(this.saltRounds);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const emailHtml = `<div>Registration Successful!</div>
      <p>Your registration with email id: ${user.email} is successful.</p>`;

      await sendEmail(user.email, "New Registeration: Portfolio", emailHtml);

      res.status(201).json({
        success: true,
        message: "Registered user successfully!",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
        return;
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
        return;
      }

      // Token and cookies
      const token = jwt.sign(
        {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          accountVerify: user.accountVerify,
        },
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  // Getting the profile of the user
  public getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found!",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          accountVerify: user.accountVerify,
        },
      });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  };

  public otpVerify = async (req: Request, res: Response): Promise<void> => {
    if (!req.body) {
      console.log("❌ req.body is undefined!");
      res.status(400).json({
        success: false,
        message: "Invalid request - no data received",
      });
      return;
    }
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      if (user.accountVerify) {
        res.status(200).json({
          success: true,
          message: "User is already verified.",
        });
        return;
      }

      const otp = String(Math.floor(10000 + Math.random() * 90000));

      user.otpVerify = otp;
      user.otpExpired = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();

      // Send OTP email
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Hello ${user.name},</p>
          <p>Use the following OTP to verify your email:</p>
          <h1 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 24 hours.</p>
        </div>
      `;

      await sendEmail(user.email, "Verify Your Email - Portfolio", emailHtml);

      res.status(200).json({
        success: true,
        message: "Verification OTP sent to email!",
      });
    } catch (error: any) {
      console.error("OTP verification error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  };

  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        res.status(400).json({
          success: false,
          message: "Email and OTP are required.",
        });
        return;
      }

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      if (user.otpVerify === "" || user.otpVerify !== otp) {
        res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
        return;
      }

      if (user.otpExpired < Date.now()) {
        res.status(400).json({
          success: false,
          message: "OTP has expired",
        });
        return;
      }

      user.accountVerify = true;
      user.otpVerify = "";
      user.otpExpired = 0;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Email verified successfully!",
      });
    } catch (error: any) {
      console.error("Verify email error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  };

  public isAuthenticated = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user = req.user;
      if (user) {
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Not authenticated",
        });
      }
    } catch (error: any) {
      console.error("Auth check error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  public resendOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({
          success: false,
          message: "Email is required.",
        });
        return;
      }

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      const otp = String(Math.floor(10000 + Math.random() * 90000));

      user.resetOtp = otp;
      user.resetOtpExpired = Date.now() + 10 * 60 * 1000;
      await user.save();

      // Resend the email
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Code</h2>
          <p>Hello ${user.name},</p>
          <p>Use the following OTP to reset your password:</p>
          <h1 style="color: #DC2626; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `;

      await sendEmail(user.email, "Reset Your Password - Portfolio", emailHtml);

      res.status(200).json({
        success: true,
        message: "Verification OTP sent to email.",
      });
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, resetOtp, newPassword } = req.body;

      if (!email || !resetOtp || !newPassword) {
        res.status(400).json({
          success: false,
          message: "Email, OTP, and new password are required.",
        });
        return;
      }

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      if (
        !user.resetOtp ||
        user.resetOtp === "" ||
        user.resetOtp !== resetOtp
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid OTP.",
        });
        return;
      }

      if (user.resetOtpExpired < Date.now()) {
        res.status(400).json({
          success: false,
          message: "OTP expired.",
        });
        return;
      }

      // Hash password
      const salt = await bcryptjs.genSalt(12);
      const hashedPassword = await bcryptjs.hash(newPassword, salt);

      user.password = hashedPassword;
      user.resetOtp = "";
      user.resetOtpExpired = 0;
      await user.save();

      // Send confirmation email
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Changed Successfully</h2>
          <p>Hello ${user.name},</p>
          <p>Your password has been successfully reset.</p>
          <p>If you didn't make this change, please contact support immediately.</p>
        </div>
      `;

      await sendEmail(
        user.email,
        "Password Reset Successful - Portfolio",
        emailHtml
      );

      res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  };
}

export default new AuthUserController();
