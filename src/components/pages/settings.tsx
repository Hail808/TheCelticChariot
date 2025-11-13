"use client"

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
        //need to code to enable notifications
    }
  };
  
  const toggleNotifications = () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    if(newValue){
        //need to code to enable notifications (if client wants)
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

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(passwordData.newPassword==passwordData.confirmPassword)
    {
        console.log("Password Success:", passwordData);
        router.push('/user_dashboard')
        setPasswordError(false);
        //need to code to change password
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
    <div className="min-h-screen bg-[#e5ede1] py-8 px-4" style={{ fontFamily: 'Lalezar, cursive' }}>
      {/* header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-normal text-black mb-4">Account Settings</h1>
        <a 
          href='/user_dashboard' 
          className="text-[#5B6D50] hover:text-[#4a5a40] hover:underline transition-colors"
        >
          ← Return to Dashboard
        </a>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* account information Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-normal text-black mb-6 pb-3 border-b-2 border-[#5B6D50]">
            Account Information
          </h2>
          <form onSubmit={handleUsernameSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-[#5B6D50] font-normal">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={usernameData.username}
                onChange={handleUsernameChange}
                placeholder="Enter new username"
                required
                className="px-4 py-3 border-2 border-gray-300 rounded bg-white focus:outline-none focus:border-[#5B6D50] transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors"
            >
              Update Username
            </button>
          </form>
        </div>

        {/* change password section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-normal text-black mb-6 pb-3 border-b-2 border-[#5B6D50]">
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword" className="text-[#5B6D50] font-normal">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                required
                className={`px-4 py-3 border-2 rounded bg-white focus:outline-none transition-colors ${
                  passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#5B6D50]'
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-[#5B6D50] font-normal">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                required
                className={`px-4 py-3 border-2 rounded bg-white focus:outline-none transition-colors ${
                  passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#5B6D50]'
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-[#5B6D50] font-normal">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                required
                className={`px-4 py-3 border-2 rounded bg-white focus:outline-none transition-colors ${
                  passwordError ? 'border-red-500' : 'border-gray-300 focus:border-[#5B6D50]'
                }`}
              />
            </div>

            {passwordError && (
              <p className="text-red-600 text-sm">
                Passwords do not match. Please try again.
              </p>
            )}

            <button 
              type="submit" 
              className="bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* user preferences card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-normal text-black mb-6 pb-3 border-b-2 border-[#5B6D50]">
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#e5ede1] rounded border border-gray-200">
              <div>
                <h3 className="text-lg font-normal text-[#5B6D50] mb-1">Cookies</h3>
                <p className="text-gray-600 text-sm">Enable or disable cookies for enhanced experience</p>
              </div>
              <button 
                onClick={toggleCookies}
                className={`px-6 py-2 rounded font-normal transition-colors ${
                  cookiesEnabled 
                    ? 'bg-[#5B6D50] text-white hover:bg-[#4a5a40]' 
                    : 'bg-transparent text-[#5B6D50] border-2 border-[#5B6D50] hover:bg-[#5B6D50] hover:text-white'
                }`}
              >
                {cookiesEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-[#e5ede1] rounded border border-gray-200">
              <div>
                <h3 className="text-lg font-normal text-[#5B6D50] mb-1">Notifications</h3>
                <p className="text-gray-600 text-sm">Receive updates about orders and promotions</p>
              </div>
              <button 
                onClick={toggleNotifications}
                className={`px-6 py-2 rounded font-normal transition-colors ${
                  notificationsEnabled 
                    ? 'bg-[#5B6D50] text-white hover:bg-[#4a5a40]' 
                    : 'bg-transparent text-[#5B6D50] border-2 border-[#5B6D50] hover:bg-[#5B6D50] hover:text-white'
                }`}
              >
                {notificationsEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        {/* actions card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={logout}
              className="w-full bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors"
            >
              Sign Out
            </button>
            <button 
              onClick={handleDelete}
              className="w-full bg-[#c44536] text-white px-8 py-3 rounded font-normal hover:bg-[#a02f20] transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
