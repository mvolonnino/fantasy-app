import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAllTeams = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        try {
          setData([]);
          if (error) setError("");
          setLoading(true);
          const response = await axios.get(
            "http://localhost:5000/api/v1/teams/getTeams/all"
          );

          if (response) {
            const { data } = response;
            data.sort((a, b) => a.name.localeCompare(b.name));
            setData(data);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return { data, error, loading };
};

export default useFetchAllTeams;
