import { getSession } from "next-auth/react";
const SERVER : string = process.env.REACT_APP_SOCKET_URL;

export default async function handler(req, res) {
   const session = await fetch(SERVER+"/getSession").then(res => res.json())
   

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json({ user: session.user });
}