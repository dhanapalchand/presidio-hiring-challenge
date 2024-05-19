const express = require("express");
const landdetailsController = require("../controller/userController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();
routes.use(requireAuth);


routes.get("/get_one_user/:id", landdetailsController.getOneUserById);




module.exports = routes;
