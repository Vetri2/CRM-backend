// utils/emailSender.js

const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    service: config.emailConfig.service,
    auth: {
        user: config.emailConfig.username,
        pass: config.emailConfig.password,
    },
});

const sendLeadNotificationEmail = async (lead) => {
    const mailOptions = {
        from: config.emailConfig.username,
        to: "manager@example.com, admin@example.com",
        subject: "New Lead Notification",
        text: `A new lead (${lead.name}) has been created. Please take necessary action.`,
    };
    await transporter.sendMail(mailOptions);
};

const sendServiceRequestNotificationEmail = async (serviceRequest) => {
    const mailOptions = {
        from: config.emailConfig.username,
        to: "manager@example.com, admin@example.com",
        subject: "New Service Request Notification",
        text: `A new service request (${serviceRequest.name}) has been created. Please take necessary action.`,
    };
    await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, resetPasswordURL) => {
    const mailOptions = {
        from: config.emailConfig.username,
        to: email,
        subject: "Reset Password",
        text: `Please click on the following link to reset your password: ${resetPasswordURL}`,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendLeadNotificationEmail,
    sendServiceRequestNotificationEmail,
    sendResetPasswordEmail,
};
