const express = require("express");
const { getPlayers, getPlayerByName } = require("../controllers/players");

const router = express.Router();

router.get("/getPlayers/all", getPlayers);
router.get("/getPlayer/:name", getPlayerByName);

module.exports = {
  routes: router,
};
