"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateAccount = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const signUpResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.username
        })
      });

      const signUpData = await signUpResponse.json();

      if (!signUpResponse.ok || !signUpData.success) {
        setError(signUpData.error || 'Sign up failed');
        return;
      }
      router.push('/user_dashboard');
      router.refresh()
    } catch (err) {
      console.error('Form submit error:', err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#e5ede1] flex flex-col items-center justify-center px-6 py-12">

      {/* Sign up card */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#333] mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-semibold text-[#333] mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6D50] focus:border-transparent transition"
              placeholder="Enter your username"
            />
          </div>

          {/* Email field */}
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

          {/* Password field */}
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

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Create account button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5B6D50] text-white py-3 rounded-lg font-semibold hover:bg-[#4a5a40] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Back to login link */}
          <div className="flex justify-center items-center pt-4 border-t border-gray-200">
            <span className="text-gray-600 text-sm mr-2">Already have an account?</span>
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-[#5B6D50] hover:underline text-sm font-medium"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;