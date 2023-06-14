import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { JWT_TOKEN } from "../utils/constants";
import authStore from "./auth";

export const AppContext = createContext();

const AppContainer = ({ children }) => {
  const [setStaff] = useState([]);

  const [store, setStore] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      auth: authStore,
    }
  );

  const values = {
    ...store,
    updater: (_store, payload) => {
      setStore({
        [_store]: payload,
      });
    },
  };
  const getStaff = async () => {
    await axios({
      method: "GET",
      url: "https://api-dev-overtime.assist.id/api/Masyarakats/ApiAfterLogin/?",
      headers: {
        Authorization: JWT_TOKEN,
      },
    }).then((res) => {
      console.log("role list", res.data.data[0]);
      const roleList = res.data.data[0].Role.menuAccess;
      setStore({
        auth: {
          ...store.auth,
          user: res.data.data[0],
          roleList,
          token: JWT_TOKEN,
        },
      });
    });
  };
  useEffect(() => {
    getStaff();
  }, []);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContainer;
