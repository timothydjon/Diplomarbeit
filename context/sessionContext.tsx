import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const SERVER = process.env.REACT_APP_SOCKET_URL;
export const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageSent, setLastMessageSent] = useState("");
  
  const router = useRouter();
  const [newChatOpen, setNewChatOpen] = useState(false)

  useEffect(() => {
    // Fetch session data from server-side
    const fetchSession = async () => {
      try {
        const res = await fetch(`${SERVER}/getSession`, {
          method: "POST",
          credentials: "include",
          mode: "cors"
        });

        const data = await res.json();
        setUser(data.user);
        if (!data.user) {
          router.push('/login');
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        router.push('/login');
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser, lastMessage, setLastMessage, lastMessageSent, setLastMessageSent, newChatOpen, setNewChatOpen }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
