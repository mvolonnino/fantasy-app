import React, { useContext } from "react";
import { Main, Login } from "./index";

import { UserContext } from "../context";

const Landing = () => {
  const { userState } = useContext(UserContext);
  console.log(userState);
  const { user } = userState;

  return <>{user ? <Main /> : <Login />}</>;
};

export default Landing;
