// sessionContext.js
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const SERVER = process.env.REACT_APP_SOCKET_URL;
export const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch session data from server-side
    const fetchSession = async () => {
      try {
        const res = await fetch(`${SERVER}/getSession`, {
          method: "POST",
          credentials: "include"
        });

        const data = await res.json();
        console.log("Session user: ", data.user)
        setUser(data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;