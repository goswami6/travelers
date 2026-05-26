import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Car, Shield, Compass, Navigation, Check, Loader, User } from 'lucide-react';

const VEHICLES = [
  { id: 'eco', name: 'Eco Sedan', rate: 1.80, desc: 'Fuel-efficient, standard transit', wait: '3 min', capacity: 4, icon: '🚗' },
  { id: 'suv', name: 'Premium SUV', rate: 2.85, desc: 'Spacious 6-seater, luxury interior', wait: '5 min', capacity: 6, icon: '🚙' },
  { id: 'electric', name: 'Luxury Electric', rate: 3.90, desc: 'Eco-friendly Tesla Model S', wait: '4 min', capacity: 4, icon: '⚡' }
];

export default function Taxi({ prefillData, clearPrefill, onBookTaxi, userProfile }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('suv');
  const [distance, setDistance] = useState(12.4); // Mock distance in miles
  const [fareEstimate, setFareEstimate] = useState(0);
  const [displayFare, setDisplayFare] = useState(0); // Animated fare count up
  
  // Booking and tracking status states
  const [bookingState, setBookingState] = useState('idle'); // 'idle' | 'searching' | 'assigned' | 'enroute' | 'completed'
  const [driverName, setDriverName] = useState('');
  const [driverCarPlate, setDriverCarPlate] = useState('');
  const [cabPosition, setCabPosition] = useState({ x: 50, y: 150 }); // Starting point on map
  const pathRef = useRef(null);

  // Prefill hook
  useEffect(() => {
    if (prefillData) {
      setPickup(prefillData.pickup);
      setDrop(prefillData.drop);
      if (prefillData.vehicleType) {
        const matchingVeh = VEHICLES.find(v => v.name.toLowerCase().includes(prefillData.vehicleType.toLowerCase()));
        if (matchingVeh) setSelectedVehicle(matchingVeh.id);
      }
      clearPrefill();
    }
  }, [prefillData]);

  // Calculate fare and trigger animated count-up
  useEffect(() => {
    const veh = VEHICLES.find(v => v.id === selectedVehicle);
    const baseFare = 5.00; // Base pickup fee
    const calculated = parseFloat((baseFare + distance * veh.rate).toFixed(2));
    setFareEstimate(calculated);
  }, [selectedVehicle, distance]);

  // Handle count-up animation
  useEffect(() => {
    if (displayFare === fareEstimate) return;
    const difference = fareEstimate - displayFare;
    const step = parseFloat((difference / 10).toFixed(2));
    
    if (Math.abs(difference) < 0.1) {
      setDisplayFare(fareEstimate);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayFare(prev => parseFloat((prev + step).toFixed(2)));
    }, 30);

    return () => clearTimeout(timer);
  }, [fareEstimate, displayFare]);

  // Trigger Booking Simulated flow
  const handleBookCab = (e) => {
    e.preventDefault();
    if (!pickup || !drop) return;

    setBookingState('searching');
    
    // Step 1: Search for driver
    setTimeout(() => {
      setBookingState('assigned');
      setDriverName(['Michael Sterling', 'Sarah Lin', 'Robert Carter'][Math.floor(Math.random() * 3)]);
      setDriverCarPlate(`TX-${Math.floor(1000 + Math.random() * 9000)}`);
      
      // Step 2: Start ride enroute (Cab moves along map path)
      setTimeout(() => {
        setBookingState('enroute');
      }, 2000);
    }, 2000);
  };

  // Animate cab along the SVG path
  useEffect(() => {
    if (bookingState !== 'enroute') return;
    
    let progress = 0;
    const path = pathRef.current;
    if (!path) return;
    
    const totalLength = path.getTotalLength();
    
    const interval = setInterval(() => {
      progress += 2; // Speed step
      if (progress >= totalLength) {
        progress = totalLength;
        clearInterval(interval);
        
        // Ride completed
        setTimeout(() => {
          setBookingState('completed');
          onBookTaxi({
            id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
            type: 'taxi',
            vehicleType: VEHICLES.find(v => v.id === selectedVehicle).name,
            pickup,
            drop,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fare: fareEstimate,
            distance: `${distance} mi`,
            status: 'Completed'
          });
        }, 1000);
      }

      const point = path.getPointAtLength(progress);
      setCabPosition({ x: point.x, y: point.y });
    }, 40);

    return () => clearInterval(interval);
  }, [bookingState, pathRef]);

  // Reset booking screen
  const handleReset = () => {
    setBookingState('idle');
    setPickup('');
    setDrop('');
    setCabPosition({ x: 50, y: 150 });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-left animate-fade-in">
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Urban Taxi Booking</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-2">On-demand corporate transport and luxury airport shuttles.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Side: Booking panel */}
        <div className="lg:col-span-5 space-y-6 animate-fade-in">
          {bookingState === 'idle' && (
            <div className="rounded-2xl glass-panel p-6 sm:p-8 shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500">
              <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Schedule a Ride</h2>
              <form onSubmit={handleBookCab} className="space-y-4">
                {/* Pickup address */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600" size={16} />
                    <input
                      type="text"
                      placeholder="Enter pickup address"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm lg:text-base text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>
                </div>

                {/* Dropoff address */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Drop Location</label>
                  <div className="relative">
                    <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600" size={16} />
                    <input
                      type="text"
                      placeholder="Enter drop-off address"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm lg:text-base text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm"
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Choice selector */}
                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Class</label>
                  <div className="space-y-2">
                    {VEHICLES.map((vehicle) => {
                      const isSelected = selectedVehicle === vehicle.id;
                      return (
                        <div
                          key={vehicle.id}
                          onClick={() => setSelectedVehicle(vehicle.id)}
                          className={`flex items-center justify-between cursor-pointer rounded-xl p-4 border transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-md ${
                            isSelected
                              ? 'bg-indigo-50/50 border-indigo-500 shadow-md ring-1 ring-indigo-400/30'
                              : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{vehicle.icon}</span>
                            <div>
                              <h3 className="text-sm lg:text-base font-extrabold text-slate-900">{vehicle.name}</h3>
                              <p className="text-xs text-slate-500">{vehicle.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Estimate</span>
                            <span className="text-sm lg:text-base font-black text-indigo-650">${(5.00 + distance * vehicle.rate).toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fare Summary & Button */}
                <div className="border-t border-slate-200/60 pt-4 flex justify-between items-center mt-6">
                  <div>
                    <span className="text-xs text-slate-550 block font-semibold">Estimated Fare</span>
                    <span className="text-3xl lg:text-4xl font-black text-indigo-600 tracking-tight">${displayFare}</span>
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 px-6 py-3.5 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-600/35 hover:scale-[1.03] hover:shadow-cyan-500/25 active:scale-[0.98] transition-all duration-300"
                  >
                    Request Cab
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Active Booking States */}
          {bookingState !== 'idle' && (
            <div className="rounded-2xl glass-panel p-6 shadow-xl space-y-6 border border-slate-200/60">
              {bookingState === 'searching' && (
                <div className="text-center py-6 space-y-4">
                  <Loader className="animate-spin text-indigo-600 mx-auto" size={36} />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Matching with Driver...</h3>
                    <p className="text-xs text-slate-500 mt-1">Locating nearest executive luxury vehicle.</p>
                  </div>
                </div>
              )}

              {bookingState === 'assigned' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Driver Assigned</span>
                    <span className="text-xs font-medium text-slate-500">ETA 3 mins</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{driverName}</h4>
                      <p className="text-xs text-slate-500">Class: {VEHICLES.find(v => v.id === selectedVehicle).name}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4 flex justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">VEHICLE PLATE</span>
                      <span className="text-sm font-bold text-slate-900">{driverCarPlate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">OTP PASSCODE</span>
                      <span className="text-sm font-bold text-indigo-600">8849</span>
                    </div>
                  </div>
                </div>
              )}

              {bookingState === 'enroute' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Ride in Progress</span>
                    <span className="text-xs font-semibold text-cyan-600 animate-pulse">Live Tracking</span>
                  </div>
                  <p className="text-sm text-slate-650 leading-relaxed">
                    Your driver is currently heading towards the destination Drop-off Point. Sit back and enjoy the ride.
                  </p>
                  <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Destination</span>
                      <span className="font-semibold text-slate-900 truncate max-w-xs">{drop}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-xs">
                      <span className="text-slate-500">Distance Travelled</span>
                      <span className="font-bold text-indigo-600">{distance} mi</span>
                    </div>
                  </div>
                </div>
              )}

              {bookingState === 'completed' && (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 border border-indigo-150 text-indigo-600 animate-bounce">
                    <Check size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Ride Completed!</h3>
                    <p className="text-xs text-slate-500 mt-1">Thank you for traveling with AeroCab.</p>
                  </div>
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Amount Charged</span>
                    <span className="text-lg font-extrabold text-indigo-600">${fareEstimate}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg"
                  >
                    Schedule Another Cab
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Interactive City SVG map */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-6 shadow-xl relative overflow-hidden animate-fade-in border border-slate-200/60">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-4">
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Navigation size={14} className="text-indigo-600 animate-spin" />
              Live Route Simulator
            </span>
            <span className="text-xs font-semibold text-slate-500">District Grid Map</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-slate-950 border border-white/5 rounded-xl overflow-hidden shadow-inner">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px] opacity-30"></div>
            
            {/* Interactive Vector Map SVG */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Roads / Paths */}
              <g stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 50 50 L 350 50" />
                <path d="M 50 150 L 350 150" />
                <path d="M 50 250 L 350 250" />
                <path d="M 100 50 L 100 250" />
                <path d="M 200 50 L 200 250" />
                <path d="M 300 50 L 300 250" />
              </g>

              {/* Highlighted active route path */}
              <path
                ref={pathRef}
                d="M 50 150 L 200 150 L 200 250 L 300 250"
                stroke="rgba(99, 102, 241, 0.45)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing active path outline */}
              {bookingState === 'enroute' && (
                <path
                  d="M 50 150 L 200 150 L 200 250 L 300 250"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-draw-path"
                />
              )}

              {/* Pins (Pickup: 50,150; Drop: 300,250) */}
              {pickup && (
                <g transform="translate(50, 150)">
                  <circle r="8" fill="rgba(34, 211, 238, 0.25)" className="animate-ping" />
                  <circle r="4" fill="#22d3ee" />
                  <text y="-10" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="bold">Pickup</text>
                </g>
              )}
              {drop && (
                <g transform="translate(300, 250)">
                  <circle r="8" fill="rgba(129, 140, 248, 0.25)" className="animate-ping" />
                  <circle r="4" fill="#818cf8" />
                  <text y="-10" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">Dropoff</text>
                </g>
              )}

              {/* Animated vehicle dot */}
              {bookingState === 'enroute' && (
                <g transform={`translate(${cabPosition.x}, ${cabPosition.y})`}>
                  <circle r="12" fill="rgba(34, 211, 238, 0.3)" className="animate-pulse" />
                  <circle r="6" fill="#22d3ee" />
                  <circle r="2" fill="#ffffff" />
                </g>
              )}
            </svg>

            {/* Map overlays / status tags */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 text-[10px] font-semibold text-slate-300">
              {bookingState === 'idle' && 'Status: Waiting for route details'}
              {bookingState === 'searching' && 'Status: Vetting vehicle grid...'}
              {bookingState === 'assigned' && 'Status: Vehicle dispatched to pickup'}
              {bookingState === 'enroute' && 'Status: Ride tracking enroute'}
              {bookingState === 'completed' && 'Status: Ride completed'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
