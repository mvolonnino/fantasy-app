const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  id: Number,
  fullName: String,
  link: String,
  firstName: String,
  lastName: String,
  primaryNumber: String,
  birthDate: String,
  currentAge: Number,
  birthCity: String,
  birthStateProvince: String,
  birthCountry: String,
  height: String,
  weight: Number,
  active: Boolean,
  alternateCaptain: Boolean,
  captain: Boolean,
  rookie: Boolean,
  shootsCatches: String,
  rosterStatus: String,
  currentTeam: { id: Number, name: String, link: String },
  primaryPosition: Object,
  playerStats: {
    stats: {
      type: {
        displayName: String,
        gameType: String,
      },
      splits: Array,
    },
    nhlStats: [
      {
        season: String,
        stat: Array,
        team: Array,
        league: Object,
        sequenceNumber: Number,
      },
    ],
  },
});

playerSchema.index({
  firstName: "text",
  lastName: "text",
  primaryNumber: "text",
});
const Player = mongoose.model("Player", playerSchema);
Player.createIndexes();

module.exports = Player;
