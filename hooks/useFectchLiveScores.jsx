import { useState, useEffect } from "react";
import axios from "axios";
import { matchTeamLogo } from "../helpers";

const useFetchLiveScores = ({ teams, refresh, setRefresh }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setData([]);
        if (error) setError("");
        setLoading(true);
        const response = await axios.get(
          "https://nhl-score-api.herokuapp.com/api/scores/latest"
        );

        if (response) {
          const { data } = response;
          const newData = matchTeamLogo({ data, teams });
          console.log("new data ", { newData });
          data.games = newData;
          setData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    })();
  }, [refresh]);

  return { data, error, loading };
};

export default useFetchLiveScores;
