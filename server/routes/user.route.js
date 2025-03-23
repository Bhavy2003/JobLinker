

import express from "express";
import { login, logout, register,removeSavedJob, savedJobs, updateProfile,getUsers,getSavedJobs} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import {User} from "../models/user.model.js";
import {sendEmail} from "../utils/sendEmail.js";
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import axios from "axios";

const router = express.Router();

router.route("/signup").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/savedjob").post(isAuthenticated, savedJobs);
router.get('/savedjob', isAuthenticated, getSavedJobs);
router.delete('/savedjob', isAuthenticated, removeSavedJob);
const HUNTER_API_KEY = '473f4897677f93cd4279b7077ef7862d279704a9';

router.post("/forget-password", async (req, res) => {
    const { email } = req.body;

   

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Generate a random reset token (you can replace this logic based on your DB)
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Save the reset token in the database (update this logic based on your model)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Reset Password URL
        const resetPasswordLink = `http://localhost:5173/reset-password/`;

        // Email message
        const message = `
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <a href="${resetPasswordLink}" target="_blank">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `;

        await sendEmail({
            email,
            subject: "Password Reset Request",
            message,
        });

        res.status(200).json({ success: "Password reset link has been sent to your email." });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});



// Reset Password
// router.put('/reset-password/:token', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             resetPasswordToken: req.params.token,
//             resetPasswordExpires: { $gt: Date.now() },
//         });

//         if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

//         user.password = req.body.password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();

//         res.json({ success: true, message: 'Password has been reset' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });


router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/signup', async (req, res) => {
    try {
        

        const { fullname, email, phoneNumber, password, role } = req.body;
      

        // Validate Email with Hunter.io
        let status = 'invalid', smtp_check = false;
        try {
            const hunterResponse = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${HUNTER_API_KEY}`);
           
            status = hunterResponse.data.data.status;
            smtp_check = hunterResponse.data.data.smtp_check;
        } catch (error) {
            console.error(" Error calling Hunter.io API:", error.response ? error.response.data : error.message);
            return res.status(500).json({ success: false, message: 'Email verification service failed.' });
        }

        if (status !== 'valid' || smtp_check === false) {
            
            return res.status(400).json({ success: false, message: 'Invalid or undeliverable email address. Please use a valid email.' });
        }

        

        // Check if the email already exists in the system
        const userExists = await User.findOne({ email, role });
        if (userExists) {
           
            return res.status(400).json({ success: false, message: 'User with this email already exists.' });
        }

  

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       

        // Save new user
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        await newUser.save();

        
        res.status(201).json({ success: true, message: 'User registered successfully.' });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/users/all', getUsers);
router.get('/me',login);

router.get('/get/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('fullname email');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
export default router;