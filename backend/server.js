require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoutes");
const LandRoutes = require("./routes/landDetailsRoutes.js");
const userRoutes = require("./routes/userDetailsRoutes.js");
const likeRoutes = require("./routes/likeRoutes.js");
const interestRoutes = require("./routes/interestRoutes.js");
const serviceRoutes=require("./routes/service.js");


const app = express();

app.use(cors({}));

app.use("/public", express.static("public"));
app.use(express.static("files"));
app.use(express.json());


app.use(authRoutes);
app.use(LandRoutes);
app.use(userRoutes);
app.use(likeRoutes);
app.use(interestRoutes);
app.use(serviceRoutes);


app.get("/", async (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_URI)
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });