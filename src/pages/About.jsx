import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Award, Globe, Heart } from 'lucide-react';

const TEAM = [
  { name: 'Marcus Sterling', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
  { name: 'Elena Vance', role: 'Head of Transit Safety', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop' },
  { name: 'Sarah Lin', role: 'VP of Product Experience', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop' }
];

export default function About() {
  // Counters states
  const [tripsCount, setTripsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  useEffect(() => {
    // Smooth count-up on load
    const interval = setInterval(() => {
      setTripsCount((prev) => (prev < 150 ? prev + 3 : 150));
      setCountriesCount((prev) => (prev < 42 ? prev + 1 : 42));
      setSatisfactionCount((prev) => (prev < 99 ? prev + 2 : 99));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
        <span className="rounded bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-650 uppercase tracking-widest">Our Story</span>
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          Redefining Executive Travel
        </h1>
        <p className="text-sm lg:text-base text-slate-500 leading-relaxed">
          AeroCab was born in 2024 out of a simple vision: to eliminate the friction between flying the skies and command the streets.
        </p>
      </div>

      {/* Trust Stats section with count animation */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-6 border-y border-slate-200/60">
        <div className="p-6">
          <span className="text-4xl lg:text-5xl font-black text-indigo-600 tracking-tight block">
            {tripsCount}k+
          </span>
          <span className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-wider block mt-2">Executive Trips Logged</span>
        </div>
        <div className="p-6 border-y md:border-y-0 md:border-x border-slate-250/60">
          <span className="text-4xl lg:text-5xl font-black text-indigo-600 tracking-tight block">
            {countriesCount}+
          </span>
          <span className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-wider block mt-2">Connected Flight Terminals</span>
        </div>
        <div className="p-6">
          <span className="text-4xl lg:text-5xl font-black text-indigo-600 tracking-tight block">
            {satisfactionCount}%
          </span>
          <span className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-wider block mt-2">Passenger Satisfaction Rate</span>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl glass-panel p-8 border border-slate-200/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-650 mb-6 shadow-inner">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Our Mission</h3>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              To build a seamless, luxury travel ecosystem where flights, airport lounges, and private ground transportation synchronize automatically in real-time, eliminating friction for the elite passenger.
            </p>
          </div>
        </div>

        <div className="rounded-2xl glass-panel p-8 border border-slate-200/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-650 mb-6 shadow-inner">
            <Globe size={22} />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Our Vision</h3>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              To set the global standard for smart luxury travel management, establishing carbon-offset pathways, clean electric taxi transit nodes, and high-contrast digital dashboards that align with passenger desires.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Timeline */}
      <section className="space-y-8 py-6">
        <h2 className="text-2xl lg:text-3xl font-black text-center text-slate-900 tracking-tight">Journey Timeline</h2>
        <div className="relative border-l border-slate-200 ml-4 md:ml-32 space-y-8 animate-slide-up">
          <div className="relative pl-6">
            <div className="absolute -left-[6px] top-1.5 h-3.5 w-3.5 rounded-full bg-indigo-600 border-2 border-white"></div>
            <span className="text-xs font-bold text-slate-400">MAY 2024</span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1">Conception & Funding</h4>
            <p className="text-xs lg:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-xl">
              Founders aligned transit tracking APIs with airline carriers to establish unified scheduling engines.
            </p>
          </div>
          <div className="relative pl-6">
            <div className="absolute -left-[6px] top-1.5 h-3.5 w-3.5 rounded-full bg-indigo-600 border-2 border-white"></div>
            <span className="text-xs font-bold text-slate-400">OCTOBER 2025</span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1">AeroCab VIP Launch</h4>
            <p className="text-xs lg:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-xl">
              Released corporate flights aggregator and private sedan bookings in John F. Kennedy Airport (JFK).
            </p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="space-y-8">
        <h2 className="text-2xl lg:text-3xl font-black text-center text-slate-900 tracking-tight">The Executive Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div 
              key={member.name}
              className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-md hover:shadow-2xl hover:border-indigo-300 hover:-translate-y-1.5 transition-all duration-500 ease-out text-center"
            >
              <img 
                src={member.img} 
                alt={member.name} 
                className="h-28 w-28 rounded-full object-cover mx-auto shadow-md border-2 border-slate-100 group-hover:border-cyan-400 transition-all duration-500"
              />
              <h3 className="text-base lg:text-lg font-bold text-slate-900 mt-4">{member.name}</h3>
              <p className="text-xs text-indigo-600 font-semibold mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
