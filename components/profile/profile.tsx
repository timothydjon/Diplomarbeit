import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../../context/sessionContext';
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import cn from "classnames"
import styles from './profile.module.scss';
import Pencil from '../../assets/Pencil'
import Logo from '../../assets/Logo'

const SERVER: string = process.env.REACT_APP_SOCKET_URL;

const Profile = (props) => {
  const { id } = props;
  const router = useRouter();
  const { user } = useContext(SessionContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleBackButton = () => {
    router.push('/chats')
  }

  const handleFileChange = async (e) => {
    setProfilePicture(e.target.files[0]);
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    handleUploadProfilePicture(e.target.files[0]);
  };

  const handleUploadProfilePicture = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;
      const data = {
        userId: user.id,
        newPicture: base64data
      };
      try {
        const response = await fetch(`${SERVER}/changeProfilePicture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          setMessage('Profile picture updated successfully!');
        } else {
          setMessage("Uploaded picture is too big!")
        }
      } catch (error) {
        console.error(error);
        setMessage('Server error');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePicture = async () => {
    try {
      const response = await fetch(`${SERVER}/changeProfilePicture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          newPicture: null
        }),
      });
  
      if (response.ok) {
        setMessage('Profile picture removed successfully!');
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword1 !== newPassword2) {
      setMessage('New passwords do not match');
      return;
    }
  
    // password complexity rules
    const minLength = 8;
    const hasUppercase = newPassword1.toLowerCase() !== newPassword1;
    const hasLowercase = newPassword1.toUpperCase() !== newPassword1;
    const hasNumber = /\d/.test(newPassword1);
    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword1);
  
    if (newPassword1.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !specialChar) {
      setMessage('Password must be at least 8 characters, have an uppercase letter, a lowercase letter, a number, and a special character');
      return;
    }
  
    try {
      const response = await fetch(`${SERVER}/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword: newPassword1, email: user.email }),
      });
  
      if (response.ok) {
        setMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword1('');
        setNewPassword2('');
        setShowOldPassword(false);
        setShowNewPassword1(false);
        setShowNewPassword2(false);
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error');
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setMessage('');
  };

  const handleNewPassword1Change = (e) => {
    setNewPassword1(e.target.value);
    setMessage('');
  };

  const handleNewPassword2Change = (e) => {
    setNewPassword2(e.target.value);
    setMessage('');
  };

  
  useEffect(() => {
    setUserId(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (userId) {
          const response = await fetch(`${SERVER}/getProfilePicture?userId=${userId}`);
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
  }, [userId, imagePreviewUrl]);


  return (
    <div className={cn(styles.container, "w-full h-full min-h-screen")}>
              <button
      onClick={handleBackButton}
      className={`ml-10 mt-10`}
        > 
        <Logo />
    </button>
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <div className="relative mb-4">
        <div className="w-40 h-40 rounded-full mx-auto overflow-hidden relative">
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl[0].profile_picture}
              className="object-cover w-full h-full"
            />
          )}
          
          {!!user && imagePreviewUrl && user.id == id && (
            <button
              onClick={handleRemoveProfilePicture}
              className="absolute top-3 right-4 flex items-center justify-center w-8 h-8 rounded-full text-black bg-white"
            >
              <FiX />
            </button>
          )}

        {!!user && imagePreviewUrl && user.id == id && (
          <div className="absolute bottom-2 right-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-blue-500 cursor-pointer"
              style={{ width: '25px', height: '25px' }}
            >
              <Pencil/>
            </label>
          </div>
          )}
        </div>
      </div>

      {!!user && user.id == id && <div className="mb-4">
      <h2 className="text-xl font-bold">
        You are logged In As{' '}
        <span className="text-purple mt-2 font-black">{user.username}</span>

      </h2>
    </div>}

    {!!user && <div className="mb-4">
        <h2 className="text-xl font-bold">E-Mail</h2>
       <span>{user.email}</span>
      </div>
      }

      {!!user && user.id == id && <div className="mb-4">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="mb-2">
      <label htmlFor="oldPassword" className="mr-2">Old Password:</label>
      <input
        type={showOldPassword ? "text" : "password"}
        id="oldPassword"
        value={oldPassword}
        onChange={handleOldPasswordChange}
        onBlur={() => setShowOldPassword(false)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button type="button" onClick={() => setShowOldPassword(!showOldPassword)}>
        {showOldPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
    <div className="mb-2">
      <label htmlFor="newPassword" className="mr-2">New Password: (at least 8 characters)</label>
      <input
        type={showNewPassword1 ? "text" : "password"}
        id="newPassword"
        value={newPassword1}
        onChange={handleNewPassword1Change}
        onBlur={() => setShowNewPassword1(false)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button type="button" onClick={() => setShowNewPassword1(!showNewPassword1)}>
        {showNewPassword1 ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
    <div className="mb-2">
      <label htmlFor="newPassword2" className="mr-2">Repeat new Password:</label>
      <input
        type={showNewPassword2 ? "text" : "password"}
        id="newPassword2"
        value={newPassword2}
        onChange={handleNewPassword2Change}
        onBlur={() => setShowNewPassword2(false)}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      <button type="button" onClick={() => setShowNewPassword2(!showNewPassword2)}>
        {showNewPassword2 ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
        {!!oldPassword && newPassword1.length > 5 && newPassword2.length > 5 && newPassword1.length == newPassword2.length && (
          <button
          onClick={handleChangePassword}
          className={`text-2xl font-bold text-gray-800 mb-6 text-center`}
        >
          Save
        </button>
        )}
        {message && <p className="text-purple mt-2 font-black">{message}</p>}
      </div>
      }
    
    </div>
</div>

  );
};

export default Profile;