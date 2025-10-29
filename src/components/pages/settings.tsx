"use client"

import '../../styles/settings.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '../../lib/actions/auth-actions';

const SettingsContent = () => {
  const [usernameData, setUsernameData] = useState({
    username: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const [cookiesEnabled, setCookiesEnabled] = useState<boolean>(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const toggleCookies = () => {
    const newValue = !cookiesEnabled;
    setCookiesEnabled(newValue);
    if(newValue){
        //code to enable notifications
    }
    
  };
  
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    if(newValue){
        //code to enable notifications
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameData({ ...usernameData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Username ", usernameData);
    router.push('/user_dashboard')
  };

  const logout = async () => {
    await signOut();
    router.push('/login')
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => { //Will need to add validation 
    e.preventDefault()
    if(passwordData.newPassword==passwordData.confirmPassword)
    {
        console.log("Password Success:", passwordData);
        router.push('/user_dashboard')
        setPasswordError(false);
        //code to change password
    }
    else
    {
        console.log("New password and confirm password must match")
        setPasswordError(true);
    }
    
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you wish to delete your account? This cannot be undone.");
    if (isConfirmed) {
        console.log("User confirmed deletion.");
        router.push('/user_dashboard')
      } else {
        console.log("User canceled deletion.");
      }
  }

  return (
    <>
      <div className='header'>
        <h1>Settings</h1>
        <a href='/user_dashboard'>Return to Account Page</a>
        <hr className="header-line" />
      </div>
    <div className='settings-container'>
      <div className='change-login-info'>
        <button onClick={logout}>Sign Out</button>
        <form onSubmit={handleUsernameSubmit}>

          <div>
            <label htmlFor="username">Change Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={usernameData.username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          </form>

          
          <form onSubmit={handlePasswordSubmit}>
          <h1>Change Password</h1>

          <div>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
              className={passwordError ? 'error-input' : ''}
            />
          </div>

          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              className={passwordError ? 'error-input' : ''}
            />
          </div>


          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              className={passwordError ? 'error-input' : ''}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className='button-section'>
        <button onClick={toggleCookies}>
            {cookiesEnabled ? "Disable Cookies" : "Enable Cookies"}
        </button>
        <button onClick={toggleNotifications}>
            {notificationsEnabled ? "Disable Notifications" : "Enable Notifications"}
        </button>
         
        <button className='delete' onClick={handleDelete}>Delete Account</button>

      </div>
      </div>

    </>
  );
};

export default SettingsContent;
