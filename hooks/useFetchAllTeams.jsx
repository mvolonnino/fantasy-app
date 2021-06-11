import { useState, useEffect } from "react";
import { Platform } from "react-native";
import axios from "axios";

const OS = Platform.OS;

const useFetchAllTeams = () => {
  let localhost = "localhost";
  let ipAddress = "192.168.1.12";
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [URL, setURL] = useState(
    OS === "ios"
      ? `http://${localhost}:5000/api/v1/teams/getTeams/all`
      : `http://${ipAddress}:5000/api/v1/teams/getTeams/all`
  );

  useEffect(() => {
    (async () => {
      try {
        setData([]);
        if (error) setError("");
        setLoading(true);
        const response = await axios.get(URL);
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
