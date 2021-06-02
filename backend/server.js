const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health check
app.get("/status", (req, res) => res.status(200).send("Status: Healthy"));

// Routes
const teamRoutes = require("./routes/team.routes");
app.use("/api/v1/teams", teamRoutes.routes);

const playerRoutes = require("./routes/player.routes");
app.use("/api/v1/players", playerRoutes.routes);

mongoose
  .connect(process.env.DRAFT_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to MongoAtlas");
    app.listen(PORT, () => {
      console.log(`Server running on port => http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
