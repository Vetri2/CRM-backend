// controllers/serviceRequestsController.js

const ServiceRequest = require("../models/ServiceRequest");
const emailSender = require("../utils/emailSender");

const getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find();
        return res.status(200).json(serviceRequests);
    } catch (error) {
        console.error("Error getting service requests:", error);
        return res
            .status(500)
            .json({ message: "Failed to get service requests" });
    }
};

const createServiceRequest = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const newServiceRequest = new ServiceRequest({
            name,
            description,
            status,
        });
        await newServiceRequest.save();
        // Trigger email to manager and admin
        await emailSender.sendServiceRequestNotificationEmail(
            newServiceRequest
        );
        return res
            .status(201)
            .json({ message: "Service request created successfully" });
    } catch (error) {
        console.error("Error creating service request:", error);
        return res
            .status(500)
            .json({ message: "Failed to create service request" });
    }
};

const getServiceRequestById = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(req.params.id);
        if (!serviceRequest) {
            return res
                .status(404)
                .json({ message: "Service request not found" });
        }
        return res.status(200).json(serviceRequest);
    } catch (error) {
        console.error("Error getting service request by ID:", error);
        return res
            .status(500)
            .json({ message: "Failed to get service request" });
    }
};

const updateServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!serviceRequest) {
            return res
                .status(404)
                .json({ message: "Service request not found" });
        }
        return res.status(200).json(serviceRequest);
    } catch (error) {
        console.error("Error updating service request:", error);
        return res
            .status(500)
            .json({ message: "Failed to update service request" });
    }
};

const deleteServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndDelete(
            req.params.id
        );
        if (!serviceRequest) {
            return res
                .status(404)
                .json({ message: "Service request not found" });
        }
        return res
            .status(200)
            .json({ message: "Service request deleted successfully" });
    } catch (error) {
        console.error("Error deleting service request:", error);
        return res
            .status(500)
            .json({ message: "Failed to delete service request" });
    }
};

module.exports = {
    getAllServiceRequests,
    createServiceRequest,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest,
};
