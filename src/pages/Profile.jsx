import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Heart, History, Shield, Check, Plus, Trash2, QrCode, FileText, Plane, Car } from 'lucide-react';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop'
];

export default function Profile({ userProfile, setUserProfile, bookings, onToast }) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'info' | 'preferences' | 'payment'
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  
  // Local edit states
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  
  // Preferences states
  const [prefSeat, setPrefSeat] = useState(userProfile.preferences.seat);
  const [prefMeal, setPrefMeal] = useState(userProfile.preferences.meal);
  const [prefEco, setPrefEco] = useState(userProfile.preferences.ecoFriendly);
  const [prefClass, setPrefClass] = useState(userProfile.preferences.classType);

  // New passenger states
  const [newPassengerName, setNewPassengerName] = useState('');
  const [newPassengerType, setNewPassengerType] = useState('Adult');

  // Selected ticket for showing boarding pass QR details
  const [viewTicketId, setViewTicketId] = useState(null);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      name,
      email,
      phone,
      address
    }));
    onToast('Profile contact information updated!');
  };

  const handleSavePrefs = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        seat: prefSeat,
        meal: prefMeal,
        ecoFriendly: prefEco,
        classType: prefClass
      }
    }));
    onToast('Travel preferences saved!');
  };

  const handleAddPassenger = (e) => {
    e.preventDefault();
    if (!newPassengerName) return;
    const newPassenger = {
      id: Date.now(),
      name: newPassengerName,
      type: newPassengerType
    };
    setUserProfile(prev => ({
      ...prev,
      savedPassengers: [...prev.savedPassengers, newPassenger]
    }));
    setNewPassengerName('');
    onToast(`Added passenger ${newPassengerName}`);
  };

  const handleRemovePassenger = (id, name) => {
    setUserProfile(prev => ({
      ...prev,
      savedPassengers: prev.savedPassengers.filter(p => p.id !== id)
    }));
    onToast(`Removed passenger ${name}`);
  };

  const selectAvatar = (url) => {
    setUserProfile(prev => ({ ...prev, avatar: url }));
    setAvatarMenuOpen(false);
    onToast('Avatar updated!');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-indigo-50 border border-slate-200/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 gap-4 text-center md:text-left">
          {/* Avatar frame */}
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt="Avatar"
              className="h-20 w-20 rounded-full border-2 border-cyan-400 object-cover shadow-lg"
            />
            <button
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              className="absolute -bottom-1 -right-1 rounded-full bg-white border border-slate-200 p-1.5 text-cyan-600 hover:text-white hover:bg-indigo-650 transition-colors shadow"
              title="Change Photo"
            >
              <User size={12} />
            </button>
            
            {/* Avatar Select Menu */}
            {avatarMenuOpen && (
              <div className="absolute left-0 mt-2 z-20 flex gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-2xl backdrop-blur-md">
                {AVATAR_OPTIONS.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    onClick={() => selectAvatar(av)}
                    className="h-10 w-10 rounded-full cursor-pointer hover:border-cyan-500 border border-transparent object-cover"
                    alt={`Avatar preset ${idx}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <span>{userProfile.name}</span>
              <span className="rounded bg-cyan-50 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-700 border border-cyan-200 uppercase tracking-wider">Verified Flyer</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">{userProfile.email} • {userProfile.phone}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="rounded-xl bg-slate-200/50 border border-slate-200/80 px-4 py-3 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">Booked Trips</span>
            <span className="text-lg font-bold text-cyan-600">{bookings.length}</span>
          </div>
          <div className="rounded-xl bg-slate-200/50 border border-slate-200/80 px-4 py-3 text-center">
            <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider">Elite Class</span>
            <span className="text-lg font-bold text-indigo-600">{prefClass}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Tabs Sidebar & Main Screen */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Sidebar Menu tabs */}
        <div className="lg:col-span-3 rounded-2xl glass-panel p-4 space-y-1.5 animate-fade-in">
          {[
            { id: 'bookings', name: 'My Bookings', icon: History },
            { id: 'info', name: 'Profile Contact', icon: User },
            { id: 'preferences', name: 'Travel Prefs', icon: Heart },
            { id: 'payment', name: 'Saved Payments', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3.5 text-sm lg:text-base font-bold transition-all duration-300 ease-out hover:translate-x-1 hover:shadow-sm ${
                  isSel
                    ? 'bg-indigo-50 text-indigo-750 border border-indigo-100 shadow-sm ring-1 ring-indigo-400/25'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={16} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Dashboard Body Screen */}
        <div className="lg:col-span-9 rounded-2xl glass-panel p-6 shadow-xl min-h-[400px] animate-fade-in">
          {/* TAB 1: BOOKINGS LIST */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
                <span>My Bookings History</span>
                <span className="text-xs text-slate-500 font-medium">Real-time boarding updates</span>
              </h2>

              <div className="space-y-4">
                {bookings.map((booking) => {
                  const isFlight = booking.type === 'flight';
                  const isOpened = viewTicketId === booking.id;
                  
                  return (
                    <div
                      key={booking.id}
                      className="rounded-xl border border-slate-200/80 bg-white/60 hover:border-indigo-100 hover:bg-white p-5 transition-all duration-300 shadow-sm hover:shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            isFlight ? 'bg-indigo-50 text-indigo-650' : 'bg-cyan-50 text-cyan-650'
                          }`}>
                            {isFlight ? <Plane size={18} /> : <Car size={18} />}
                          </div>
                          <div>
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                              {booking.id}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 mt-1">
                              {isFlight 
                                ? `${booking.carrier} Flight ${booking.flightNumber} to ${booking.toCity}` 
                                : `Taxi cab to ${booking.drop.split(',')[0]}`}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                          <span className="text-xs font-semibold text-slate-500">{booking.date} • {booking.time}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            booking.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              : 'bg-cyan-50 text-cyan-750 border border-cyan-200/50 animate-pulse'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {/* Flight Active ticket Boarding Pass drawer toggle */}
                      {isFlight && booking.status !== 'Completed' && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <button
                            onClick={() => setViewTicketId(isOpened ? null : booking.id)}
                            className="flex items-center space-x-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                          >
                            <QrCode size={14} />
                            <span>{isOpened ? 'Hide Boarding Details' : 'View Boarding Pass QR'}</span>
                          </button>

                          {isOpened && (
                            <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-slide-up">
                              <div className="space-y-2">
                                <div>
                                  <span className="text-[10px] text-slate-500 block">PASSENGER NAME</span>
                                  <span className="text-sm font-bold text-slate-900">{userProfile.name}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-500 block">SEAT ASSIGNMENT</span>
                                  <span className="text-sm font-bold text-cyan-600">{booking.seat} ({booking.classType})</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-[10px] text-slate-500 block">GATEWAY ROUTE</span>
                                  <span className="text-sm font-bold text-slate-900">{booking.from} &rarr; {booking.to}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-500 block">EST. FLIGHT RUNTIME</span>
                                  <span className="text-sm font-medium text-slate-600">{booking.duration}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-center md:items-end justify-center">
                                <div className="bg-white p-2 rounded-lg border border-slate-200">
                                  <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${booking.qrData}`}
                                    alt="boarding ticket qr"
                                    className="h-20 w-20"
                                  />
                                </div>
                                <span className="text-[8px] text-slate-500 mt-2 font-mono">{booking.qrData}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE CONTACT INFO */}
          {activeTab === 'info' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">Contact Information</h2>
              <form onSubmit={handleSaveProfile} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Billing Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="sm:col-span-2 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg"
                  >
                    Save Contact Info
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: TRAVEL PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">Flyer Seat & Meal Preferences</h2>
                <form onSubmit={handleSavePrefs} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Cabin Seat Selection</label>
                    <select
                      value={prefSeat}
                      onChange={(e) => setPrefSeat(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
                    >
                      <option value="Window">Window</option>
                      <option value="Aisle">Aisle</option>
                      <option value="Exit Row">Exit Row - Extra Legroom</option>
                      <option value="No Preference">No Seat Preference</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">In-Flight Meal Course</label>
                    <select
                      value={prefMeal}
                      onChange={(e) => setPrefMeal(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
                    >
                      <option value="Standard">Standard Course</option>
                      <option value="Vegan">Vegan (Plant-Based)</option>
                      <option value="Halal">Halal</option>
                      <option value="Kosher">Kosher</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <input
                      type="checkbox"
                      id="eco"
                      checked={prefEco}
                      onChange={(e) => setPrefEco(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 bg-white text-indigo-650 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="eco" className="text-sm font-semibold text-slate-700 cursor-pointer">
                      Prioritize Carbon-Offset flights and green electric vehicle ride selections by default.
                    </label>
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>

              {/* Saved Passenger List Sub-section */}
              <div className="pt-8 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Saved Passengers Registry</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Passenger list */}
                  <div className="space-y-2">
                    {userProfile.savedPassengers.map((passenger) => (
                      <div
                        key={passenger.id}
                        className="flex items-center justify-between rounded-xl bg-white border border-slate-200/80 p-3.5 shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{passenger.name}</p>
                          <p className="text-xs text-slate-500">{passenger.type}</p>
                        </div>
                        {passenger.id !== 1 && (
                          <button
                            onClick={() => handleRemovePassenger(passenger.id, passenger.name)}
                            className="rounded-lg bg-slate-100 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Passenger Form */}
                  <form onSubmit={handleAddPassenger} className="space-y-4 rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <h3 className="text-sm font-bold text-slate-900">Add Companion Traveller</h3>
                    <div>
                      <input
                        type="text"
                        placeholder="Companion Full Name"
                        value={newPassengerName}
                        onChange={(e) => setNewPassengerName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <select
                        value={newPassengerType}
                        onChange={(e) => setNewPassengerType(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
                      >
                        <option value="Adult">Adult</option>
                        <option value="Child">Child (Under 12)</option>
                        <option value="Infant">Infant (Under 2)</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center space-x-2 rounded-lg bg-indigo-650 py-2.5 text-xs font-semibold text-white shadow hover:bg-indigo-750 transition-all"
                    >
                      <Plus size={14} />
                      <span>Register Companion</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAVED PAYMENTS (VISUAL CREDIT CARDS) */}
          {activeTab === 'payment' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
                <span>Secure Wallet Mocks</span>
                <span className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
                  <Shield size={12} className="text-cyan-600" />
                  <span>AES-256 Encrypted</span>
                </span>
              </h2>

              {/* Grid of Credit cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {userProfile.savedPayments.map((card) => (
                  <div
                    key={card.id}
                    className={`relative rounded-2xl p-6 text-white overflow-hidden shadow-xl flex flex-col justify-between aspect-[1.58/1] ${
                      card.type === 'Visa'
                        ? 'bg-gradient-to-br from-indigo-650 via-slate-900 to-indigo-950 border border-indigo-500/30'
                        : 'bg-gradient-to-br from-cyan-650 via-slate-900 to-cyan-950 border border-cyan-500/30'
                    }`}
                  >
                    {/* Security Microchip Mock */}
                    <div className="flex justify-between items-start">
                      <div className="h-9 w-12 rounded bg-amber-400/85 opacity-90 relative overflow-hidden border border-amber-500/30 flex flex-col justify-between p-1.5 shadow">
                        <div className="h-[2px] bg-slate-900/20 w-full"></div>
                        <div className="h-[2px] bg-slate-900/20 w-full"></div>
                        <div className="h-[2px] bg-slate-900/20 w-full"></div>
                      </div>
                      <span className="text-sm font-extrabold tracking-wider italic text-white/95">{card.type}</span>
                    </div>

                    {/* Card number */}
                    <div className="mt-8 text-lg font-mono tracking-widest font-semibold text-white/95">
                      {card.number}
                    </div>

                    {/* Details footer */}
                    <div className="mt-6 flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-white/50 block font-semibold uppercase">CARD HOLDER</span>
                        <span className="text-xs font-bold tracking-wide uppercase text-white/95">{card.holder}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-white/50 block font-semibold uppercase">EXPIRES</span>
                        <span className="text-xs font-bold text-white/95">{card.expiry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
