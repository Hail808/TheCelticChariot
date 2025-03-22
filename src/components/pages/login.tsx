"use client";  // Mark as client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User submitted with name " + formData.username + " and password " + formData.password);
  };

  const handleForgotPassword = () => {
    router.push('/forgot_password');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div  className="password-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={handleForgotPassword} className="forgot-password-button"> Forgot Password</button>
        </div>
      </div>
      </form>
      
    </div>
  );
};

export default Login;