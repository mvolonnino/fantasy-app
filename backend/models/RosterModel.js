const mongoose = require("mongoose");

const rosterSchema = mongoose.Schema({
  roster: Array,
  team: String,
});

const Roster = mongoose.model("Roster", rosterSchema);

module.exports = Roster;
