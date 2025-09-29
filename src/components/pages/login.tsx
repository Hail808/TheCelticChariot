"use client";  // Mark as client component
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/login.css';
import { signIn, signInSocial } from '../../../lib/actions/auth-actions';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    try {
        const result = await signIn(formData.email,formData.password)
      if(!result.user)
      {
        setError("Please try again");
      }
      else{
        router.push('/user_dashboard')
      }
    }
    catch(err){
      console.error("Sign-in error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleCreateAccount = () =>{
    router.push('/create_account');
  }


  const handleForgotPassword = () => {
    router.push('/forgot_password');
  };

  const handleGoogleAuth = async () =>
  {
    try {
        const result = await signInSocial()
    }
    catch(err){
      console.error("Sign-in error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
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
        <div className="button-format">
          <button type="submit" className="login-button">Login</button>
          <button onClick={handleForgotPassword} className="forgot-password-button">Forgot Password?</button>
          <button onClick={handleCreateAccount} className="create-account-button">Create Account</button>
        </div>
        <div className="button-format">
           <button onClick={handleGoogleAuth} className="google-button">Continue With Google</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      
    </div>
  );
};

export default Login;