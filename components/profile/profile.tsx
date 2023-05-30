import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../../context/sessionContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SERVER: string = process.env.REACT_APP_SOCKET_URL;

const Profile = (props) => {
  const { id } = props;
  const { user } = useContext(SessionContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);

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
        body: JSON.stringify({ oldPassword, newPassword: newPassword1, user }),
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


  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">General</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Display Name</h2>
        {!!user && <h3>{user.username}</h3>}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">E-Mail</h2>
        {!!user && <span>{user.email}</span>}
      </div>

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
      <label htmlFor="newPassword" className="mr-2">New Password: (at least 6 characters)</label>
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
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>}
    </div>
  );
};

export default Profile;