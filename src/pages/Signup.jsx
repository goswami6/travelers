import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight, Check } from 'lucide-react';

export default function Signup({ setCurrentPage, onToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [strength, setStrength] = useState(0); // 0 to 4
  const [strengthLabel, setStrengthLabel] = useState('');
  const [validationError, setValidationError] = useState('');

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setStrength(0);
      setStrengthLabel('');
      return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const finalScore = Math.min(4, score);
    setStrength(finalScore);

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
    setStrengthLabel(labels[finalScore]);
  }, [password]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      onToast('Validation failed.');
      return;
    }
    if (!terms) {
      setValidationError('You must accept the Terms and Conditions.');
      onToast('Validation failed.');
      return;
    }

    setValidationError('');
    onToast('Account created successfully! Welcome to AeroCab.');
    setCurrentPage('profile');
  };

  const getStrengthBarColor = () => {
    switch (strength) {
      case 1: return 'bg-rose-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-indigo-500';
      case 4: return 'bg-emerald-500';
      default: return 'bg-slate-200';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md rounded-2xl glass-panel p-8 shadow-2xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500 animate-fade-in">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg mb-4">
            <UserPlus size={22} />
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-xs lg:text-sm text-slate-500 mt-1.5">Join AeroCab premium executive travel network</p>
        </div>

        {validationError && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs text-rose-700 animate-fade-in">
            {validationError}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Alexander Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
            
            {/* Password strength bar animation */}
            {password && (
              <div className="mt-2 space-y-1.5 animate-fade-in">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>PASSWORD STRENGTH</span>
                  <span className="text-slate-600">{strengthLabel}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${getStrengthBarColor()}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="signup-terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="signup-terms" className="text-xs text-slate-500 cursor-pointer select-none">
            I agree to the <span className="font-semibold text-indigo-600 hover:underline">Terms & Conditions</span> and <span className="font-semibold text-indigo-600 hover:underline">Privacy Policy</span>.
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-cyan-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <span>Register Account</span>
          <ArrowRight size={16} />
        </button>
      </form>

      <p className="mt-6 text-center text-xs lg:text-sm text-slate-550">
        Already have an account?{' '}
        <button 
          onClick={() => setCurrentPage('login')}
          className="font-bold text-indigo-600 hover:text-indigo-750 transition-colors"
        >
          Log in
        </button>
      </p>
      </div>
    </div>
  );
}
