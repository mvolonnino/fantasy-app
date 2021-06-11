import { useState, useEffect } from "react";
import axios from "axios";
import { teamsURL } from "../helpers";

const useFetchAllTeams = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setData([]);
        if (error) setError("");
        setLoading(true);
        const response = await axios.get(teamsURL);
        if (response) {
          const { data } = response;
          data.sort((a, b) => a.name.localeCompare(b.name));
          setData(data);
        }
      } catch (error) {
        console.log({ error });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};

export default useFetchAllTeams;
