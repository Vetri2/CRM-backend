// controllers/leadsController.js

const Lead = require("../models/Lead");
const emailSender = require("../utils/emailSender");

const getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        return res.status(200).json(leads);
    } catch (error) {
        console.error("Error getting leads:", error);
        return res.status(500).json({ message: "Failed to get leads" });
    }
};

const createLead = async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;
        const newLead = new Lead({
            name,
            email,
            phone,
            status,
        });
        await newLead.save();
        // Trigger email to manager and admin
        await emailSender.sendLeadNotificationEmail(newLead);
        return res.status(201).json({ message: "Lead created successfully" });
    } catch (error) {
        console.error("Error creating lead:", error);
        return res.status(500).json({ message: "Failed to create lead" });
    }
};

const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        return res.status(200).json(lead);
    } catch (error) {
        console.error("Error getting lead by ID:", error);
        return res.status(500).json({ message: "Failed to get lead" });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        return res.status(200).json(lead);
    } catch (error) {
        console.error("Error updating lead:", error);
        return res.status(500).json({ message: "Failed to update lead" });
    }
};

const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        return res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        console.error("Error deleting lead:", error);
        return res.status(500).json({ message: "Failed to delete lead" });
    }
};

module.exports = {
    getAllLeads,
    createLead,
    getLeadById,
    updateLead,
    deleteLead,
};
