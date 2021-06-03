const express = require("express");
const { googlelogin } = require("../controllers/users");

const router = express.Router();

router.post("/googlelogin", googlelogin);

module.exports = {
  routes: router,
};
