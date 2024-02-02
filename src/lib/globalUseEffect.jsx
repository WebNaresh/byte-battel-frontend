import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect } from "react";
import useAppCookies from "../hooks/useAppCookies";
import useAppState from "../hooks/useAppState";

const UseEffectContext = createContext();

const UseEffectState = (props) => {
  const { setProgress, location, user, setUser } = useAppState();
  const { cookies } = useAppCookies();

  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    // eslint-disable-next-line
  }, [location]);
  useEffect(() => {
    cookies["app-cookie"];
    if (user === null) {
      const user = jwtDecode(cookies["app-cookie"]);
      console.log(`🚀 ~ file: globalUseEffect.jsx:23 ~ user:`, user);
      setUser(user.user);
    }
  }, []);

  return (
    <UseEffectContext.Provider value={{}}>
      {props.children}
    </UseEffectContext.Provider>
  );
};

export { UseEffectContext, UseEffectState as default };
