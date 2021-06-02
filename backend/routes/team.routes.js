const express = require("express");
const { getTeams, getTeamByName } = require("../controllers/teams");

const router = express.Router();

router.get("/getTeams/all", getTeams);
router.get("/getTeam/:name", getTeamByName);

module.exports = {
  routes: router,
};
