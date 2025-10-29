"use client";  // Mark as client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/login.css';
import { signUp } from '../../lib/actions/auth-actions';

const CreateAccount = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const result = await signUp(formData.email,formData.password,formData.username)
        if(!result.user)
        {
            setError("Please Try Again");
        }
        else{
            router.push('/user_dashboard')
        }
    }
    catch(err){
      setError(err instanceof Error ? err.message : "Unknown error");
    }

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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-format">
          <button type="submit" className="login-button">Submit</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
       
    </div>
  );
};

export default CreateAccount;