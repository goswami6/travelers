import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Login({ setCurrentPage, onToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulated simple validation error trigger for demo of the shake effect
    if (password.length < 6) {
      setIsShaking(true);
      setErrorMessage('Password must be at least 6 characters.');
      onToast('Invalid credentials provided.');
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setErrorMessage('');
    onToast('Logged in successfully! Welcome back.');
    setCurrentPage('profile');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
      <div 
        className={`w-full max-w-md rounded-2xl glass-panel p-8 shadow-2xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500 ${
          isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg mb-4">
            <LogIn size={22} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs lg:text-sm text-slate-500 mt-1.5">Sign in to your AeroCab executive account</p>
        </div>

        {errorMessage && (
          <div className="mb-4 flex items-center space-x-2 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 animate-fade-in">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                placeholder="alexander.vance@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <button 
                type="button" 
                onClick={() => onToast('Password reset link dispatched!')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-750 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-cyan-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>Log In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <span className="relative bg-white px-3 text-xs font-semibold text-slate-400">OR CONTINUE WITH</span>
        </div>

        <button
          onClick={() => {
            onToast('Connecting with Google Secure login...');
            setCurrentPage('profile');
          }}
          className="w-full flex items-center justify-center space-x-2.5 rounded-xl bg-white border border-slate-200 py-2.5 text-xs lg:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-350 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-sm"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#ea4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.66 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.96-2.88 3.66-4.51 6.76-4.51z"/>
            <path fill="#4285f4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"/>
            <path fill="#fbbc05" d="M5.24 14.55c-.25-.76-.39-1.57-.39-2.41 0-.84.14-1.65.39-2.41L1.39 6.74C.5 8.52 0 10.5 0 12.6s.5 4.08 1.39 5.86l3.85-2.91z"/>
            <path fill="#34a853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.03.69-2.35 1.1-4.23 1.1-3.1 0-5.8-1.63-6.76-4.51L1.39 16.7C3.37 20.59 7.35 23 12 23z"/>
          </svg>
          <span>Sign In with Google</span>
        </button>

        <p className="mt-8 text-center text-xs lg:text-sm text-slate-550">
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentPage('signup')}
            className="font-bold text-indigo-600 hover:text-indigo-750 transition-colors"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}
