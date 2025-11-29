"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, getCurrentUser } from '../../lib/actions/auth-actions';
import { updateUsername, updatePassword, deleteAccount } from '../../lib/settings-actions';

const SettingsContent = () => {
  const [usernameData, setUsernameData] = useState({
    username: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Load current user data
    const loadUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUsernameData({ username: user.name });
      }
    };
    loadUser();
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameData({ ...usernameData, [e.target.name]: e.target.value });
    setUsernameError('');
    setSuccessMessage('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setPasswordError('');
    setSuccessMessage('');
  };

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUsernameError('');
    setSuccessMessage('');

    const result = await updateUsername(usernameData.username);
    
    setLoading(false);

    if (result.success) {
      setSuccessMessage('Username updated successfully!');
      setTimeout(() => {
        router.push('/user_dashboard');
      }, 1500);
    } else {
      setUsernameError(result.error || 'Failed to update username');
    }
  };

  const logout = async () => {
    await signOut();
    router.push('/login');
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password must match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );

    setLoading(false);

    if (result.success) {
      setSuccessMessage('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        router.push('/user_dashboard');
      }, 1500);
    } else {
      setPasswordError(result.error || 'Failed to update password');
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you wish to delete your account? This cannot be undone."
    );
    
    if (isConfirmed) {
      setLoading(true);
      const result = await deleteAccount();
      setLoading(false);

      if (result.success) {
        router.push('/login');
      } else {
        alert(result.error || 'Failed to delete account');
      }
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

      {/* Success message */}
      {successMessage && (
        <div className="max-w-4xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

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
                className={`px-4 py-3 border-2 rounded bg-white focus:outline-none transition-colors ${
                  usernameError ? 'border-red-500' : 'border-gray-300 focus:border-[#5B6D50]'
                }`}
              />
              {usernameError && (
                <p className="text-red-600 text-sm">{usernameError}</p>
              )}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Username'}
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
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* actions card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={logout}
              disabled={loading}
              className="w-full bg-[#5B6D50] text-white px-8 py-3 rounded font-normal hover:bg-[#4a5a40] transition-colors disabled:opacity-50"
            >
              Sign Out
            </button>
            <button 
              onClick={handleDelete}
              disabled={loading}
              className="w-full bg-[#c44536] text-white px-8 py-3 rounded font-normal hover:bg-[#a02f20] transition-colors disabled:opacity-50"
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