import { useState, useEffect } from "react";
import axios from "axios";

const useFetchLiveScores = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
          setData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshing]);

  return { data, error, loading, refreshing, setRefreshing };
};

export default useFetchLiveScores;
