import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppCookies from "../hooks/useAppCookies";
import useAppState from "../hooks/useAppState";

const UseEffectContext = createContext();

const UseEffectState = (props) => {
  const { setProgress, location, user, setUser } = useAppState();
  const { cookies } = useAppCookies();
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    // eslint-disable-next-line
  }, [location]);
  useEffect(() => {
    if (user === null) {
      if (cookies["app-cookie"]) {
        const user = jwtDecode(cookies["app-cookie"]);
        setUser(user.user);
      }
    }
  }, []);

  return (
    <UseEffectContext.Provider value={{}}>
      {props.children}
    </UseEffectContext.Provider>
  );
};

export { UseEffectContext, UseEffectState as default };
