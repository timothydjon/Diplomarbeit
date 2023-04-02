import { Chats } from "../components/chatRoom/ChatRoom.interface";


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

export const getChatsByUserId = async (userId: number): Promise<Chats[] | string> => {
  try {
    const response = await fetch(`${SERVER}/getChatsByUserId/${userId}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'If-None-Match': 'W/"1a0-gyQY2A4vzbFCGULjXBn25lhOcOQ"',
      },
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Error fetching Chats');
    }
    const data = await response.json(); 
    return data.result;
  } catch (error) {
    console.error('There was an error fetching Chats:', error);
    return 'Error fetching Chats';
  }
};
