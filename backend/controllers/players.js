const PlayerModel = require("../models/PlayerModel");

const getPlayers = async (req, res) => {
  try {
    const players = await PlayerModel.find();
    console.log(players);
    res.status(200).json(players);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPlayerByName = async (req, res) => {
  const { name } = req.params;
  try {
    const player = await PlayerModel.find({
      $expr: {
        $regexMatch: {
          input: { $concat: ["$firstName", " ", "$lastName"] },
          regex: name,
          options: "i",
        },
      },
    });

    if (!player) return res.status(404).json([]);

    console.log("Selected Player => ", player, player.length);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerByName,
};
