import React, { useEffect, useState } from 'react';
import IRoomTeaser from './userPreview.interface';
import Link from "next/link"
import styles from "./userPreview.module.scss"

const UserPreview= (props: IRoomTeaser) => {
  const { user, ...rest } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const SERVER: string = process.env.REACT_APP_SOCKET_URL;

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (user.id) {
          const response = await fetch(`${SERVER}/getProfilePicture?userId=${user.id}`);
          if (response.ok) {
            const responseData = await response.json();
            setImagePreviewUrl(responseData.image);
          } else {
            console.error('Failed to fetch profile picture');
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching the profile picture:', error);
      }
    };
    fetchProfilePicture();
  }, []);

  return (
  <Link {...rest} target='_' href={`/users/${user.id}`} className={`${styles.userPreview} w-full flex items-center p-1 h border-2 border-grey-light rounded-3xl focus:outline-none mb-5 mr-2 `}>
      <div className="h-16 w-16 rounded-full overflow-hidden">
      {imagePreviewUrl && (
            <img
              src={imagePreviewUrl[0].profile_picture}
              className={`"object-cover w-full h-full object-cover ${styles.userImage}`}
            />
          )}
      </div>
      <div className="ml-4 flex flex-col justify-between items-start h-full">
        <span className={`text-white text-xl font-semibold ${styles.username}`}>{user.username}</span>
      </div>
    </Link>
  );
};

export default UserPreview;
