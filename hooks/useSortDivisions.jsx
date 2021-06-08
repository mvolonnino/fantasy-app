import React, { useState, useEffect } from "react";

const userSortDivisions = (data) => {
  const [divisions, setDivisions] = useState({
    ["MassMutual East"]: [],
    ["Scotia North"]: [],
    ["Discover Central"]: [],
    ["Honda West"]: [],
  });

  const spiltConferences = (team) => {
    const { name } = team.division;
    if (name)
      setDivisions((prevDivisions) => ({
        ...prevDivisions,
        [name]: [...prevDivisions[name], team],
      }));
  };

  useEffect(() => {
    if (
      divisions["Discover Central"].length === 0 ||
      divisions["Honda West"].length === 0 ||
      divisions["Scotia North"].length === 0 ||
      divisions["MassMutual East"].length === 0
    ) {
      data.map((team) => {
        spiltConferences(team);
      });
    }
  }, [data]);

  return { divisions };
};
export default userSortDivisions;
