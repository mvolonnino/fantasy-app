import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAllTeams = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (error) setError("");
        const response = await axios.get(
          "http://localhost:5000/api/v1/teams/getTeams/all"
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
  }, []);

  return { data, error, loading };
};

export default useFetchAllTeams;
