import { createContext, useState } from "react";

const AccessContext = createContext({});

export const AccesProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  return (
    <AccessContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessContext.Provider>
  );
};
export default AccessContext;
