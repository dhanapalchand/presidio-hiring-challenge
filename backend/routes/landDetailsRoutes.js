const express = require("express");
const landdetailsController = require("../controller/landdetailsController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();
routes.use(requireAuth);

routes.get("/get_land", landdetailsController.getLand);
routes.post("/post_land", landdetailsController.addLand);
routes.get("/get_land/:userId", landdetailsController.getLandById);
routes.get("/get_one_land/:id", landdetailsController.getOneLandById);
routes.put("/edit_land/:id", landdetailsController.updateLand);
routes.delete("/delete_land/:id",landdetailsController.deleteLand);



module.exports = routes;
