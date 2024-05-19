const express = require("express");
const interestController = require("../controller/interestController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();
routes.use(requireAuth);



routes.post('/interest_land', interestController.registerInterest);
routes.get('/interest/:userId', interestController.getAllInterestsByUserId);
routes.delete('/delete_interest/:id', interestController.deleteInterestById);




module.exports = routes;
