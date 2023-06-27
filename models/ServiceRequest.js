// models/ServiceRequest.js

const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["New", "In Progress", "Completed", "Closed"],
            default: "New",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
