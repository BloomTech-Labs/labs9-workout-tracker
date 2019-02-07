import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Store } from "./index";

const keyName = "login_token";

export default ComposedComponent => {
  function requireAuth(props) {
    const token = localStorage.getItem(keyName);

    const { dispatch, state } = useContext(Store);

    if (token && token !== "undefined") {
      const decoded = jwt.decode(token);

      const currentTime = Date.now() / 1000;

      if (decoded && currentTime > decoded.exp) {
        localStorage.removeItem(keyName);
        return <Redirect to={"/login"} />;
      }

      if (state.uid !== decoded.user_id) {
        axios
          .get("https://fitmetrix.herokuapp.com/api/user", {
            headers: { Authorization: token }
          })
          .then(res => {
            dispatch({ type: "USER_MODEL", payload: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      }

      return <ComposedComponent {...props} />;
    }

    return <Redirect to={"/login"} />;
  }
  return requireAuth;
};
