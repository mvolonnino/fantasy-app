const mongoose = require("mongoose");
const { schema } = require("./RosterModel");

const teamSchema = mongoose.Schema({
  id: Number,
  name: String,
  link: String,
  venue: {
    id: Number,
    name: String,
    link: String,
    city: String,
    timeZone: {
      id: String,
      offset: Number,
      tz: String,
    },
  },
  abbreviation: String,
  teamName: String,
  locationName: String,
  firstYearOfPlay: String,
  division: { id: Number, name: String, link: String },
  conference: { id: Number, name: String, link: String },
  franchise: {
    franchiseId: Number,
    teamName: String,
    link: String,
  },
  shortName: String,
  officialSiteUrl: String,
  franchiseId: Number,
  active: Boolean,
  roster: Array,
});

teamSchema.index({ name: "text", abbreviation: "text" });
const Team = mongoose.model("Team", teamSchema);
Team.createIndexes();

module.exports = Team;
