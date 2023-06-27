// controllers/authController.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("../config");
const emailSender = require("../utils/emailSender");

const register = async (req, res) => {
    try {
        const { username, password, firstName, lastName, userType } = req.body;
        // Check if the username (email) is already registered
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username is already registered" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            userType,
        });
        await newUser.save();
        return res
            .status(201)
            .json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Failed to register user" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: "1d",
        });
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Failed to log in" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if the user exists
        const user = await User.findOne({ username: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Generate reset token
        const resetToken = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: "1h",
        });
        // Send reset password email
        const resetPasswordURL = `http://your-frontend-url/reset-password/${resetToken}`;
        await emailSender.sendResetPasswordEmail(email, resetPasswordURL);
        return res.status(200).json({ message: "Reset password email sent" });
    } catch (error) {
        console.error("Error sending reset password email:", error);
        return res
            .status(500)
            .json({ message: "Failed to send reset password email" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        // Verify the reset token
        const decodedToken = jwt.verify(token, config.jwtSecret);
        // Find the user by ID
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Failed to reset password" });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};
