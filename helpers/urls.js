import { Platform } from "react-native";

let localhost = "localhost";
let ipAddress = "192.168.1.12";

export const googleURL =
  Platform.OS === "ios"
    ? `http://${localhost}:5000/api/v1/user/googlelogin`
    : `http://${ipAddress}:5000/api/v1/user/googlelogin`;

export const teamsURL =
  Platform.OS === "ios"
    ? `http://${localhost}:5000/api/v1/teams/getTeams/all`
    : `http://${ipAddress}:5000/api/v1/teams/getTeams/all`;
