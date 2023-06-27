import { User } from "../components/ui/newChatOverlay/NewChatOverlay";


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await fetch(`${SERVER}/getUserById/${userId}`, {
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
  }
};
