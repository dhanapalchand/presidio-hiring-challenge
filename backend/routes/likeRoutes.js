const express = require("express");
const likeController = require("../controller/likeController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();
routes.use(requireAuth);



routes.post('/like_land',  likeController.likeLand);
routes.get('/likes/:userId', likeController.getLikesByUserId);
routes.delete('/delete_like/:id', likeController.deleteLikeById);
routes.get('/likes', likeController.getAllLikes);




module.exports = routes;
