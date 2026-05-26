import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Globe, CheckCircle } from 'lucide-react';

export default function Contact({ onToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    onToast('Your message has been dispatched successfully!');
    
    // Reset form after delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-left animate-fade-in">
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Connect with Concierge</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-2">Get direct 24/7 executive customer support or dispatch details.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left column: Contact Info and Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl glass-panel p-6 shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Contact Channels</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">TELEPHONE DIRECT LINE</span>
                  <span className="text-sm font-semibold text-slate-700">+91 96162 12526</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">SUPPORT CONCIERGE EMAIL</span>
                  <span className="text-sm font-semibold text-slate-700">concierge@aerocab.vip</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">BUSINESS HQ ADDRESS</span>
                  <span className="text-sm font-semibold text-slate-700">Unit No. 671, Aggarwal Millennium Tower 2, NSP, Pitampura</span>
                </div>
              </div>

              <div className="flex items-center space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">SUPPORT WORK HOURS</span>
                  <span className="text-sm font-semibold text-slate-700">24 Hours / 7 Days a week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive city/district simulated map vector */}
          <div className="rounded-2xl bg-slate-950 p-6 border border-white/5 shadow-xl relative overflow-hidden h-[240px] flex flex-col justify-between animate-[fadeIn_1.2s_ease-out]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-35"></div>
            
            <div className="relative z-10 flex justify-between items-start text-white">
              <div>
                <h4 className="text-sm font-bold tracking-tight">HQ Map Location</h4>
                <p className="text-[10px] text-slate-400">NSP, Pitampura</p>
              </div>
              <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[8px] font-bold text-cyan-400 uppercase tracking-widest">Active Node</span>
            </div>

            <svg viewBox="0 0 200 100" className="w-full h-[60%] select-none pointer-events-none opacity-45 relative z-10">
              <g stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none">
                <path d="M 10 20 L 190 20" />
                <path d="M 10 60 L 190 60" />
                <path d="M 50 10 L 50 90" />
                <path d="M 150 10 L 150 90" />
              </g>
              <circle cx="150" cy="60" r="6" fill="#06b6d4" className="animate-ping" />
              <circle cx="150" cy="60" r="4" fill="#06b6d4" />
            </svg>
          </div>
        </div>

        {/* Right Column: Contact form with submit success animation */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl glass-panel p-6 sm:p-8 shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500 min-h-[400px] flex flex-col justify-center">
            {submitted ? (
              <div className="text-center space-y-4 animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 mb-2 animate-bounce">
                  <CheckCircle size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Message Dispatched!</h3>
                  <p className="text-xs lg:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-sm mx-auto">
                    Thank you, {name}. Your inquiry has been routed to our corporate passenger concierge team. We will respond within 15 minutes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Direct Inquiry Dispatch</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="Alexander Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Email Address</label>
                    <input
                      type="email"
                      placeholder="alexander.vance@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message Details</label>
                    <textarea
                      placeholder="How can our concierge assist with your travel scheduling?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:outline-none transition-all duration-300 shadow-sm"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3.5 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-cyan-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
