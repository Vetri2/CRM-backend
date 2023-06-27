require("dotenv").config(); // index.js

const express = require("express");
const { connectToDatabase } = require("./lib/db");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const leadsRoutes = require("./routes/leadsRoutes");
const serviceRequestsRoutes = require("./routes/serviceRequestsRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectToDatabase();

// Middleware to parse JSON request body
app.use(express.json());

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Content Security Policy middleware
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
        },
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/service-requests", serviceRequestsRoutes);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
