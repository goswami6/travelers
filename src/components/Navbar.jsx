import React, { useState } from 'react';
import { Plane, Car, User, Menu, X, Sparkles, Info, PhoneCall, LogIn, UserPlus } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', name: 'Explore', icon: Sparkles },
    { id: 'flights', name: 'Flights', icon: Plane },
    { id: 'taxi', name: 'Cabs', icon: Car },
    { id: 'profile', name: 'Dashboard', icon: User },
    { id: 'about', name: 'About', icon: Info },
    { id: 'contact', name: 'Contact', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2.5 group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-500/25 border border-white/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Plane size={20} className="transform -rotate-45" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            Aero<span className="text-cyan-600 font-black">Cab</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-indigo-50/80 text-indigo-600 border-indigo-100/80 shadow-[0_2px_10px_rgba(99,102,241,0.06)] scale-102'
                    : 'text-slate-650 border-transparent hover:bg-slate-50 hover:text-slate-950 hover:scale-102'
                }`}
              >
                <Icon size={16} className={isActive ? 'animate-pulse' : 'opacity-70 group-hover:opacity-100'} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Account & Login Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <button 
            onClick={() => setCurrentPage('login')}
            className={`flex items-center space-x-1.5 rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 border ${
              currentPage === 'login' 
                ? 'bg-slate-100 text-indigo-600 border-slate-200 shadow-inner' 
                : 'text-slate-650 border-transparent hover:bg-slate-50 hover:text-slate-950 hover:scale-102'
            }`}
          >
            <LogIn size={15} />
            <span>Login</span>
          </button>

          <button 
            onClick={() => setCurrentPage('signup')}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:from-indigo-700 hover:to-cyan-600 hover:scale-[1.03] active:scale-[0.97] px-4 py-2 text-sm font-bold transition-all duration-300 shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden border border-transparent hover:border-slate-200 transition-all"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200/60 bg-white px-4 py-3 lg:hidden animate-fade-in shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-semibold transition-all border ${
                    isActive
                      ? 'bg-indigo-50/80 text-indigo-600 border-indigo-100'
                      : 'text-slate-650 border-transparent hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
            
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-2.5 text-sm font-bold hover:from-indigo-700 hover:to-cyan-600 active:scale-95 transition-all shadow-md shadow-indigo-500/10"
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
