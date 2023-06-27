// routes/leadsRoutes.js

const express = require("express");
const router = express.Router();
const leadsController = require("../controllers/leadsController");

router.get("/", leadsController.getAllLeads);
router.post("/", leadsController.createLead);
router.get("/:id", leadsController.getLeadById);
router.put("/:id", leadsController.updateLead);
router.delete("/:id", leadsController.deleteLead);

module.exports = router;
