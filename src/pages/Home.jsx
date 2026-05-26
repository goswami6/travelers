import React, { useState } from 'react';
import { Plane, Car, ArrowRight, ShieldCheck, Clock, Award, Star, Apple, Play } from 'lucide-react';

export default function Home({ setCurrentPage, setFlightSearchData, setTaxiSearchData, onToast }) {
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' | 'taxi'
  
  // Flights quick search state
  const [flightFrom, setFlightFrom] = useState('');
  const [flightTo, setFlightTo] = useState('');
  const [flightDate, setFlightDate] = useState('');

  // Taxi quick search state
  const [taxiPickup, setTaxiPickup] = useState('');
  const [taxiDrop, setTaxiDrop] = useState('');

  const handleFlightQuickSearch = (e) => {
    e.preventDefault();
    if (!flightFrom || !flightTo || !flightDate) {
      onToast('Please fill in all search parameters.');
      return;
    }
    setFlightSearchData({
      from: flightFrom,
      to: flightTo,
      date: flightDate,
      passengers: 1,
      classType: 'Business'
    });
    onToast('Transferring to Flights search...');
    setCurrentPage('flights');
  };

  const handleTaxiQuickSearch = (e) => {
    e.preventDefault();
    if (!taxiPickup || !taxiDrop) {
      onToast('Please specify pickup and drop-off points.');
      return;
    }
    setTaxiSearchData({
      pickup: taxiPickup,
      drop: taxiDrop,
      vehicleType: 'Premium SUV'
    });
    onToast('Transferring to Cab booking...');
    setCurrentPage('taxi');
  };

  const destinations = [
    { name: 'Paris, France', code: 'CDG', price: '$599', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop' },
    { name: 'Tokyo, Japan', code: 'NRT', price: '$849', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop' },
    { name: 'New York, USA', code: 'JFK', price: '$329', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop' },
    { name: 'Maldives', code: 'MLE', price: '$1,199', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop' },
  ];

  const offers = [
    { code: 'EUROPE20', title: 'European Gateways', discount: '20% OFF Flights', desc: 'Valid on business class routes to Paris & Frankfurt.', borderGlow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:border-indigo-500/40' },
    { code: 'CABRUSH', title: 'Airport Transfers', discount: '15% OFF Cabs', desc: 'Save on luxury sedan pickups from JFK, LAX & LHR.', borderGlow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-500/40' },
    { code: 'LUXUP', title: 'Elite Membership', discount: 'Free Airport Lounge', desc: 'Complimentary premium lounge passes on multi-city flights.', borderGlow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:border-amber-500/40' },
  ];

  const testimonials = [
    { name: 'Marcus Vance', role: 'Venture Capitalist', text: 'AeroCab completely changed how I manage business trips. Booking a flight and having a luxury SUV waiting on the tarmac is pure magic.', stars: 5 },
    { name: 'Clara Croft', role: 'Travel Blogger', text: 'The glassmorphic design is beautiful, but the speed is what wowed me. Being able to transition from checking a boarding pass to tracking my cab driver is incredibly smooth.', stars: 5 }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full py-24 px-6 sm:px-12 md:px-20 text-center shadow-lg animate-fade-in">
        {/* Background Image with subtle hover zoom effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out scale-105 hover:scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop')` }}
        />
        {/* Sleek Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-indigo-950/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] drop-shadow-md transition-all duration-500">
            <span className="block">Travel the Skies,</span>
            <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent text-glow-cyan animate-pulse-subtle">
              Command the Streets
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed drop-shadow-sm">
            Book luxury flights and executive ground transportation in one unified, glassmorphic dashboard.
          </p>

          {/* Quick Search Tab Console */}
          <div className="mx-auto mt-12 max-w-3xl lg:max-w-5xl rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl hover:border-white/20 transition-all duration-500 animate-slide-up">
            <div className="flex border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('flights')}
                className={`flex items-center space-x-2 border-b-2 px-5 py-2.5 text-sm lg:text-base font-bold transition-all duration-300 ${
                  activeTab === 'flights'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Plane size={18} />
                <span>Book Flights</span>
              </button>
              <button
                onClick={() => setActiveTab('taxi')}
                className={`flex items-center space-x-2 border-b-2 px-5 py-2.5 text-sm lg:text-base font-bold transition-all duration-300 ${
                  activeTab === 'taxi'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-300 hover:text-white'
                }`}
              >
                <Car size={18} />
                <span>Book Taxi</span>
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'flights' ? (
                <form onSubmit={handleFlightQuickSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-end">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">From</label>
                    <input
                      type="text"
                      placeholder="City or Airport (e.g. JFK)"
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm lg:text-base text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">To</label>
                    <input
                      type="text"
                      placeholder="City or Airport (e.g. CDG)"
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm lg:text-base text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Departure Date</label>
                    <input
                      type="date"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm lg:text-base text-white focus:border-cyan-400 focus:bg-white/15 focus:outline-none [color-scheme:dark] transition-all duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3.5 px-6 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-650 hover:to-cyan-650 hover:scale-[1.03] hover:shadow-cyan-500/20 active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Search Flights</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleTaxiQuickSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-end">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Pickup Location</label>
                    <input
                      type="text"
                      placeholder="Address, hotel or airport"
                      value={taxiPickup}
                      onChange={(e) => setTaxiPickup(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm lg:text-base text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Drop Location</label>
                    <input
                      type="text"
                      placeholder="Destination address"
                      value={taxiDrop}
                      onChange={(e) => setTaxiDrop(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm lg:text-base text-white placeholder-slate-400 focus:border-cyan-400 focus:bg-white/15 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3.5 px-6 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-650 hover:to-cyan-650 hover:scale-[1.03] hover:shadow-cyan-500/20 active:scale-[0.98] transition-all duration-300"
                  >
                    <span>Find Cab Fare</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content wrapper for other sections */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Partner Brands Grid */}
      <section className="py-8 border-b border-slate-200/60 text-center animate-fade-in">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by Leading Aviation & Transit Networks</p>
        <div className="marquee-container opacity-50 hover:opacity-90 transition-all duration-500">
          <div className="animate-marquee py-2">
            {/* First Set */}
            <div className="flex items-center space-x-16 md:space-x-24 pr-16 md:pr-24">
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Plane size={16} />
                <span>STAR ALLIANCE</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Car size={16} />
                <span>UBER NETWORK</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Award size={16} />
                <span>SKYTEAM</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Award size={16} />
                <span>EMIRATES GROUP</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <ShieldCheck size={16} />
                <span>LYFT PREMIUM</span>
              </div>
            </div>
            {/* Duplicate Set for Seamless Loop */}
            <div className="flex items-center space-x-16 md:space-x-24 pr-16 md:pr-24" aria-hidden="true">
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Plane size={16} />
                <span>STAR ALLIANCE</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Car size={16} />
                <span>UBER NETWORK</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Award size={16} />
                <span>SKYTEAM</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <Award size={16} />
                <span>EMIRATES GROUP</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-650 font-semibold tracking-wider text-sm">
                <ShieldCheck size={16} />
                <span>LYFT PREMIUM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">Popular Destinations</h2>
        <p className="mt-2 text-sm lg:text-base text-slate-500">Curated, luxury-focused destinations for global wanderers.</p>
        
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              onClick={() => {
                setFlightSearchData({
                  from: 'JFK',
                  to: dest.code,
                  date: '2026-06-01',
                  passengers: 1,
                  classType: 'Business'
                });
                onToast(`Routing flights to ${dest.name}...`);
                setCurrentPage('flights');
              }}
              className="group relative h-80 lg:h-96 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 shadow-md transition-all duration-500 ease-out hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2 active:scale-[0.98]"
            >
              {/* Image & Zoom Effect */}
              <img
                src={dest.img}
                alt={dest.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <span className="text-xs lg:text-sm font-bold text-cyan-400 uppercase tracking-widest">{dest.code} Terminal</span>
                <h3 className="mt-1.5 text-xl lg:text-2xl font-extrabold text-white leading-tight">{dest.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm lg:text-base font-medium text-slate-200">Flights starting from <span className="font-extrabold text-white">{dest.price}</span></span>
                  <div className="rounded-xl bg-white/25 p-2 text-white opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-indigo-650">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">Exclusive Passenger Offers</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.code}
              onClick={() => {
                navigator.clipboard.writeText(offer.code);
                onToast(`Promo code '${offer.code}' copied to clipboard!`);
              }}
              className={`cursor-pointer rounded-2xl bg-white/70 border border-slate-200/80 p-6 lg:p-8 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] ${offer.borderGlow}`}
            >
              <span className="inline-block rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 border border-indigo-200">
                PROMO: {offer.code}
              </span>
              <h3 className="mt-4 text-xl lg:text-2xl font-extrabold text-slate-900 leading-snug">{offer.title}</h3>
              <p className="mt-2 text-2xl lg:text-3xl font-black text-indigo-600">{offer.discount}</p>
              <p className="mt-2 text-sm lg:text-base text-slate-500 leading-relaxed">{offer.desc}</p>
              <span className="mt-4 block text-xs font-bold text-slate-400">Click to copy code</span>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Guides & Blogs */}
      <section className="py-12 border-t border-slate-200/60 mt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">Inspire Your Next Journey</h2>
            <p className="mt-2 text-sm lg:text-base text-slate-500">Expert travel advice, checklists, and local guides for your itinerary.</p>
          </div>
          <button 
            onClick={() => onToast('Opening Travel Blog archive...')}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-xs lg:text-sm font-bold text-indigo-650 hover:text-indigo-750 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Solo Travel Guide to Tokyo: 7 Hidden Izakayas",
              category: "Culinary Guide",
              readTime: "5 min read",
              img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?q=80&w=500&auto=format&fit=crop",
              desc: "Unlock the neon corridors of Shinjuku and discover tiny authentic eateries hidden from the typical tourist routes."
            },
            {
              title: "10 Days in Paris: Exploring Beyond the Eiffel Tower",
              category: "Itinerary",
              readTime: "8 min read",
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500&auto=format&fit=crop",
              desc: "From the quiet cafes of Belleville to vintage vinyl shops in the Latin Quarter, discover the real bohemian soul of Paris."
            },
            {
              title: "Inside the VIP Lounge: Top Airport Lounges Reviewed",
              category: "Premium Travel",
              readTime: "4 min read",
              img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=500&auto=format&fit=crop",
              desc: "An inside look at spa services, gourmet buffets, and private sleeping quarters in global flight terminals."
            }
          ].map((blog, idx) => (
            <div 
              key={idx}
              onClick={() => onToast(`Loading "${blog.title}"...`)}
              className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-indigo-300"
            >
              <div className="h-48 lg:h-56 overflow-hidden relative">
                <img src={blog.img} alt={blog.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-lg bg-white/90 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                  {blog.category}
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <span className="text-[10px] lg:text-xs font-semibold text-slate-400 block">{blog.readTime}</span>
                <h3 className="mt-2 text-base lg:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-indigo-650 transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-2 text-xs lg:text-sm text-slate-500 leading-relaxed line-clamp-2">{blog.desc}</p>
                <span className="mt-4 flex items-center space-x-1.5 text-xs lg:text-sm font-bold text-indigo-600">
                  <span>Read Article</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 border-t border-slate-200 mt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Why Travel with AeroCab?</h2>
            <p className="mt-4 text-slate-550 leading-relaxed text-sm lg:text-base">
              We converge aviation-level scheduling precision with luxury ground transit, ensuring you never miss a connecting gate or ride home.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Safe & Insured', desc: 'Vetted air carriers and top-rated executive cab operators.' },
              { icon: Clock, title: 'Real-Time Sync', desc: 'Taxi pickup coordinates automatically adjust for flight delays.' },
              { icon: Award, title: 'Elite Rewards', desc: 'Earn flyer miles and cab transit credits on every luxury trip.' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="rounded-2xl bg-white/70 border border-slate-200/80 p-6 md:p-8 shadow-md hover:-translate-y-2 hover:border-indigo-300/80 hover:shadow-xl transition-all duration-500 ease-out">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-2 text-base font-extrabold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-xs lg:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <section className="py-12 border-t border-slate-200/60 mt-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-950 border border-indigo-500/20 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden animate-fade-in group hover:border-indigo-400/30 transition-all duration-500">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="max-w-xl space-y-4 relative z-10 text-center md:text-left">
            <span className="rounded bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-black">AeroCab On The Go</span>
            <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">Track Your Rides, Sync Your Gates</h2>
            <p className="text-sm lg:text-base text-slate-300 leading-relaxed">
              Download the AeroCab app to unlock automated flight delay tracking, real-time chauffeur messages, digital keys, and rapid boarding credentials.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <button 
                onClick={() => onToast('Redirecting to iOS App Store...')}
                className="flex items-center space-x-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 px-4 py-2.5 text-xs font-bold text-white hover:border-cyan-400/50 hover:scale-[1.03] transition-all duration-300 shadow-md animate-pulse-subtle"
              >
                <Apple size={15} className="text-white fill-white" />
                <div className="text-left leading-none">
                  <span className="text-[8px] text-slate-450 block font-normal">Download on the</span>
                  <span className="text-[10px] font-bold">App Store</span>
                </div>
              </button>
              <button 
                onClick={() => onToast('Redirecting to Google Play Store...')}
                className="flex items-center space-x-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 px-4 py-2.5 text-xs font-bold text-white hover:border-cyan-400/50 hover:scale-[1.03] transition-all duration-300 shadow-md animate-pulse-subtle"
              >
                <Play size={15} className="text-white fill-white" />
                <div className="text-left leading-none">
                  <span className="text-[8px] text-slate-450 block font-normal">GET IT ON</span>
                  <span className="text-[10px] font-bold">Google Play</span>
                </div>
              </button>
            </div>
          </div>

          {/* Visual Glassmorphic phone mockup */}
          <div className="relative w-full max-w-[260px] aspect-[9/18] self-end z-10 group/phone">
            {/* Phone outer gradient glow */}
            <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500 to-indigo-500 opacity-20 blur-lg group-hover/phone:opacity-40 transition duration-500"></div>
            
            {/* Actual phone container */}
            <div className="relative w-full h-full rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-2 shadow-2xl overflow-hidden animate-float">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-slate-800 rounded-b-xl z-20"></div>
              <div className="h-full w-full rounded-[2rem] bg-gradient-to-b from-indigo-950 to-slate-950 p-4 flex flex-col justify-between overflow-hidden relative">
                {/* Subtle light reflection sheen */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent -skew-y-12 pointer-events-none"></div>

                {/* Glass elements inside mockup */}
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-[10px] text-white shadow-lg">
                  <div className="flex justify-between font-bold">
                    <span>FLIGHT AA102</span>
                    <span className="text-cyan-400">ON TIME</span>
                  </div>
                  <div className="mt-1 text-[8px] text-slate-350">JFK &rarr; LHR • Gate 14B</div>
                </div>

                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-3 text-[10px] text-white text-center flex flex-col items-center shadow-md">
                  <span className="text-[8px] text-slate-400 font-semibold block">CAB ASSIGNED</span>
                  <span className="font-bold text-cyan-400 mt-0.5">Tesla Model Y • OTP 4892</span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex items-center justify-between text-[10px] text-slate-300 hover:bg-white/10 transition-all cursor-pointer">
                  <span>View Boarding Pass</span>
                  <ArrowRight size={12} className="text-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 border-t border-slate-200">
        <h2 className="text-center text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">Loved by Executive Travelers</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((test, i) => (
            <div key={i} className="rounded-2xl bg-white/80 border border-slate-200/60 p-8 shadow-md backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-400/40 transition-all duration-500 ease-out">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(test.stars)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm lg:text-base text-slate-650 italic leading-relaxed">
                "{test.text}"
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm lg:text-base font-bold text-slate-900">{test.name}</h4>
                  <p className="text-xs lg:text-sm text-slate-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
