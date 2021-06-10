const matchTeamLogo = ({ data, teams }) => {
  const { games } = data;
  for (let [i, game] of games.entries()) {
    const homeID = game.teams.home.id;
    const awayID = game.teams.away.id;
    for (let [j, team] of teams.entries()) {
      const { id } = team;
      if (id === homeID) {
        game.teams.home.picture = team.picture;
      }
      if (id === awayID) {
        game.teams.away.picture = team.picture;
      }
    }
  }
  return games;
};

export default matchTeamLogo;
