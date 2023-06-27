// routes/serviceRequestsRoutes.js

const express = require("express");
const router = express.Router();
const serviceRequestsController = require("../controllers/serviceRequestsController");

router.get("/", serviceRequestsController.getAllServiceRequests);
router.post("/", serviceRequestsController.createServiceRequest);
router.get("/:id", serviceRequestsController.getServiceRequestById);
router.put("/:id", serviceRequestsController.updateServiceRequest);
router.delete("/:id", serviceRequestsController.deleteServiceRequest);

module.exports = router;
