import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAllTeams = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "http://localhost:5000/api/v1/teams/getTeams/all"
        );
        if (data) setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};

export default useFetchAllTeams;
