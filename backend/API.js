const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Team = require("./models/TeamModel");
const Roster = require("./models/RosterModel");
const Player = require("./models/PlayerModel");
const mainURL = "https://statsapi.web.nhl.com/api/v1";

dotenv.config();

mongoose
  .connect(process.env.DRAFT_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongo atlas");
    main();
  });

async function fetchAllTeamsID() {
  const url = `${mainURL}/teams`;
  return axios
    .get(url)
    .then((response) => {
      const { teams } = response.data;
      return teams;
    })
    .catch((err) => console.log(err));
}

async function fetchTeamRoster(id, team) {
  const url = `${mainURL}/teams/${id}/roster`;

  return axios
    .get(url)
    .then((response) => {
      const { roster } = response.data;
      return roster;
    })
    .catch((err) => console.log(err));
}

async function fetchRosterPlayerInfo(id) {
  const url = `${mainURL}/people/${id}`;

  return axios
    .get(url)
    .then((response) => {
      const { people } = response.data;
      return people[0];
    })
    .catch((err) => console.log(err));
}

// id = which player to search
// year = which year to search, ie '20192020' => if year is passed, allStats should be false
// allStats = boolean to search for all stats, including NHL and other leagues => if allStats is true, will trump out specific year search
async function fetchPlayerStats(id, year, allStats) {
  // console.log({ id, year, allStats });

  let url = "";
  switch (allStats) {
    case true:
      url = `${mainURL}/people/${id}/stats?expand=person.stats&stats=yearByYear`;
      break;
    case false:
      url = `${mainURL}/people/${id}/stats?stats=statsSingleSeason&season=${year}`;
      break;
  }

  console.log("url used => ", url);
  const data = await axios
    .get(url)
    .then((response) => {
      let nhlStats = [];
      let { stats } = response.data;
      const type = stats[0].type;
      const splits = stats[0].splits;
      stats = {
        type,
        splits,
      };
      if (allStats) {
        nhlStats = stats.splits.filter((year) => {
          const { league } = year;
          return league.name === "National Hockey League" || league.id === 133;
        });
      }

      let data = {
        allStats: stats,
        nhlStats,
      };
      return data;
    })
    .catch((err) => console.log(err));

  return data;
}

async function main() {
  const teams = await fetchAllTeamsID();

  for (let [i, team] of teams.entries()) {
    console.log(`${i} of ${teams.length}`);
    const { id, name } = team;
    team.roster = await fetchTeamRoster(id, name);
    if (team.roster) {
      for (let [j, player] of team.roster.entries()) {
        console.log(`${j} of ${team.roster.length} / ${i}/${teams.length}`);
        const { id } = player.person;
        const allStats = true;
        player.stats = await fetchPlayerStats(id, null, allStats);
      }
    }
  }

  teams.forEach(async (team) => {
    const newTeam = new Team(team);

    try {
      await newTeam.save();
      console.log(`${team.name} saved`);
    } catch (error) {
      console.log(error.message);
    }
  });

  // teams.forEach((team) => {});
  // rosterArr.forEach(async (roster) => {
  //   if (roster.roster.length > 0) {
  //     const newRoster = new Roster(roster);
  //     try {
  //       await newRoster.save();
  //       console.log(`${newRoster.team} saved`);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // });
  // console.log(rosterArr[0].roster);
  // const rosterInfo = await fetchTeamRoster(5, "Pittsburgh Penguins");
  // rosterArr.push(rosterInfo);
  // console.log(rosterArr[0].roster);

  // const playerArr = [];
  // for (let [i, rosterInfo] of rosterArr.entries()) {
  //   console.log(`${i} / ${rosterArr.length}`);
  //   if (rosterInfo && rosterInfo.roster.length > 0) {
  //     const { roster } = rosterInfo;
  //     for (let [i, player] of roster.entries()) {
  //       const { id } = player.person;
  //       const allStats = true;
  //       const playerInfo = await fetchRosterPlayerInfo(id);
  //       const playerStats = await fetchPlayerStats(id, null, allStats);
  //       playerInfo.playerStats = playerStats;
  //       playerArr.push(playerInfo);
  //     }
  //   }
  // }
  // // console.log("playerArr => ", playerArr[0].playerStats, playerArr.length);
  // playerArr.forEach(async (player) => {
  //   const newPlayer = new Player(player);
  //   try {
  //     await newPlayer.save();
  //     console.log(
  //       `${newPlayer.firstName} ${newPlayer.lastName} : ${newPlayer.id} saved`
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // });

  // const id = 8471675; // sidney crosby
  // const year = 20192020;
  // const allStats = true;
  // const playerStats = await fetchPlayerStats(id, year, allStats);
  // console.log("rookie year => ", playerStats.nhlStats[0]);
}
