import React, { useState, useEffect } from "react";

const useSortConferences = (data) => {
  const [conferences, setConferences] = useState({
    Eastern: [],
    Western: [],
  });

  const spiltConferences = (team) => {
    const { name } = team.conference;
    if (name)
      setConferences((prevConferences) => ({
        ...prevConferences,
        [name]: [...prevConferences[name], team],
      }));
  };

  useEffect(() => {
    if (conferences.Eastern.length === 0 || conferences.Western.length === 0) {
      data.map((team) => {
        spiltConferences(team);
      });
    }
  }, [data]);

  return { conferences };
};
export default useSortConferences;
