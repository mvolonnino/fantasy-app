const TeamModel = require("../models/TeamModel");

const getTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    console.log(teams);
    res.status(200).json(teams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTeamByName = async (req, res) => {
  const { name } = req.params;
  try {
    const team = await TeamModel.find({
      $text: { $search: name },
    }).catch((err) => console.log(err));

    if (!team) return res.status(404).json([]);

    console.log("Selected Team => ", team);
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamByName,
};
