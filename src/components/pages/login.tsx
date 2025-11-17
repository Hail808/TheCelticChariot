"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signInSocial } from '../../lib/actions/auth-actions';
import { CartService } from '@/lib/cart-service';

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
      await signIn(formData.email, formData.password)
      router.push('/user_dashboard')
      router.refresh()
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleCreateAccount = () => {
    router.push('/create_account');
  }

  const handleForgotPassword = () => {
    router.push('/forgot_password');
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInSocial()
    } catch (err) {
      console.error("Sign-in error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <div className="min-h-screen bg-[#e5ede1] flex flex-col items-center justify-center px-6 py-12">
      {/* welcome header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#333] mb-2">Welcome Back!</h1>
      </div>

      {/* login card */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#333] mb-6 text-center">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* email field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-[#333] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6D50] focus:border-transparent transition"
              placeholder="Enter your email"
            />
          </div>

          {/* password field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-[#333] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6D50] focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          {/* error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* login button */}
          <button
            type="submit"
            className="w-full bg-[#5B6D50] text-white py-3 rounded-lg font-semibold hover:bg-[#4a5a40] transition-colors shadow-md"
          >
            Login
          </button>

          {/* divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* google button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* action links */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#5B6D50] hover:underline text-sm font-medium"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="text-[#5B6D50] hover:underline text-sm font-medium"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;