import React, { useState } from 'react';
import { Send, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ setCurrentPage, onToast }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    onToast('Subscribed successfully to newsletter!');
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-650">
      {/* Upper Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold">
                A
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Aero<span className="text-cyan-600">Cab</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Experience the pinnacle of smart transit. Fly across continents and schedule luxury cabs seamlessly under a single integrated premium dashboard.
            </p>
            <div className="mt-6 flex space-x-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((social) => (
                <button
                  key={social}
                  onClick={() => onToast(`Connecting to ${social}...`)}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-cyan-600 transition-colors"
                >
                  <Globe size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Bookings</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('flights')} className="hover:text-cyan-600 transition-colors">Flight Search</button></li>
              <li><button onClick={() => setCurrentPage('taxi')} className="hover:text-cyan-600 transition-colors">Cab Scheduling</button></li>
              <li><button onClick={() => onToast('Private charter booking dashboard is currently locked.')} className="hover:text-cyan-600 transition-colors">Private Charters</button></li>
              <li><button onClick={() => onToast('Redirecting to AeroCab Business Enterprise registration...')} className="hover:text-cyan-600 transition-colors">Corporate Travel</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-cyan-600 transition-colors">About Us</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-cyan-600 transition-colors">Contact Us</button></li>
              <li><button onClick={() => onToast('AeroCab global team directory is currently private.')} className="hover:text-cyan-600 transition-colors">Careers</button></li>
              <li><button onClick={() => onToast('Opening Media & Press Kit downloads...')} className="hover:text-cyan-600 transition-colors">Press Kit</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Stay Updated</h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Subscribe to unlock premium offers, flight schedules, and luxury cab deal announcements.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-l-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 text-white hover:opacity-90"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Contacts */}
        <div className="mt-12 border-t border-slate-200 pt-8 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            <span className="flex items-center space-x-2 text-slate-500">
              <Phone size={14} className="text-cyan-600" />
              <span>+1 (800) AERO-CAB</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-500">
              <Mail size={14} className="text-cyan-600" />
              <span>concierge@aerocab.vip</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-500">
              <MapPin size={14} className="text-cyan-600" />
              <span>One Infinite Loop, Cupertino, CA</span>
            </span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} AeroCab Global. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
