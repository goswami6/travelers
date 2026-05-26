import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, Users, SlidersHorizontal, Check, ShieldCheck, Ticket, RefreshCw, ChevronDown } from 'lucide-react';

const AIRPORTS = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy Intl Airport' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport' },
  { code: 'NRT', city: 'Tokyo', name: 'Narita International Airport' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport' },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport' }
];

const FLIGHTS_MOCK = [
  { id: 'F1', carrier: 'Air France', code: 'AF', flightNo: 'AF-104', from: 'JFK', fromCity: 'New York', to: 'CDG', toCity: 'Paris', depart: '10:30 AM', arrive: '05:45 PM', duration: '7h 15m', stops: 0, price: 620, seats: 4, class: 'Business' },
  { id: 'F2', carrier: 'British Airways', code: 'BA', flightNo: 'BA-208', from: 'JFK', fromCity: 'New York', to: 'LHR', toCity: 'London', depart: '08:00 AM', arrive: '08:20 PM', duration: '7h 20m', stops: 0, price: 480, seats: 9, class: 'Economy' },
  { id: 'F3', carrier: 'Delta Air Lines', code: 'DL', flightNo: 'DL-245', from: 'JFK', fromCity: 'New York', to: 'LHR', toCity: 'London', depart: '06:30 PM', arrive: '06:50 AM', duration: '7h 20m', stops: 0, price: 420, seats: 12, class: 'Economy' },
  { id: 'F4', carrier: 'Japan Airlines', code: 'JL', flightNo: 'JL-006', from: 'JFK', fromCity: 'New York', to: 'NRT', toCity: 'Tokyo', depart: '11:15 AM', arrive: '02:40 PM', duration: '14h 25m', stops: 0, price: 950, seats: 2, class: 'First Class' },
  { id: 'F5', carrier: 'Emirates', code: 'EK', flightNo: 'EK-201', from: 'JFK', fromCity: 'New York', to: 'DXB', toCity: 'Dubai', depart: '09:40 PM', arrive: '07:15 PM', duration: '12h 35m', stops: 1, price: 1100, seats: 5, class: 'First Class' },
  { id: 'F6', carrier: 'Singapore Airlines', code: 'SQ', flightNo: 'SQ-021', from: 'JFK', fromCity: 'New York', to: 'SIN', toCity: 'Singapore', depart: '10:30 PM', arrive: '06:10 AM', duration: '18h 40m', stops: 1, price: 1250, seats: 3, class: 'Business' }
];

export default function Flights({ prefillData, clearPrefill, onBookFlight, userProfile }) {
  // Search state
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Business');
  
  // Autocomplete toggles
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  
  // App states
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  
  // Booking checkout modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(userProfile.name);
  const [selectedPayment, setSelectedPayment] = useState(userProfile.savedPayments[0]?.id || 1);
  const [bookingProgress, setBookingProgress] = useState(false);
  const [bookedPass, setBookedPass] = useState(null);

  // Filters and Sorting
  const [sortBy, setSortBy] = useState('price'); // 'price' | 'time'
  const [filterAirline, setFilterAirline] = useState('All');
  const [filterStops, setFilterStops] = useState('All');

  // Handle prefill values from quick-search
  useEffect(() => {
    if (prefillData) {
      setFromSearch(prefillData.from);
      setToSearch(prefillData.to);
      setDepartDate(prefillData.date);
      setPassengers(prefillData.passengers || 1);
      setCabinClass(prefillData.classType || 'Business');
      
      // Auto run search
      setSearching(true);
      setTimeout(() => {
        setFlights(FLIGHTS_MOCK);
        setSearching(false);
        setSearched(true);
      }, 1200);
      
      clearPrefill();
    }
  }, [prefillData]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    setSearched(false);
    
    // Simulate API delay
    setTimeout(() => {
      setFlights(FLIGHTS_MOCK);
      setSearching(false);
      setSearched(true);
    }, 1500);
  };

  const handleOpenCheckout = (flight) => {
    setSelectedFlight(flight);
    setCheckoutOpen(true);
  };

  const handleConfirmBooking = () => {
    setBookingProgress(true);
    
    setTimeout(() => {
      const generatedSeat = `${Math.floor(Math.random() * 20) + 1}${['A', 'B', 'C', 'D', 'F'][Math.floor(Math.random() * 5)]}`;
      const virtualTicket = {
        id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'flight',
        carrier: selectedFlight.carrier,
        carrierCode: selectedFlight.code,
        flightNumber: selectedFlight.flightNo,
        from: selectedFlight.from,
        fromCity: selectedFlight.fromCity,
        to: selectedFlight.to,
        toCity: selectedFlight.toCity,
        date: departDate || '2026-06-01',
        time: selectedFlight.depart,
        duration: selectedFlight.duration,
        price: selectedFlight.price,
        seat: generatedSeat,
        classType: cabinClass,
        status: 'Active',
        qrData: `FLIGHT-${selectedFlight.flightNo}-${selectedPassenger.replace(/\s+/g, '-').toUpperCase()}-${generatedSeat}`
      };
      
      onBookFlight(virtualTicket);
      setBookedPass(virtualTicket);
      setBookingProgress(false);
    }, 1500);
  };

  // Get matching results
  const filteredFlights = flights
    .filter((f) => {
      // Filter Airline
      if (filterAirline !== 'All' && f.carrier !== filterAirline) return false;
      // Filter Stops
      if (filterStops !== 'All') {
        const stopsCount = parseInt(filterStops);
        if (f.stops !== stopsCount) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'time') {
        return a.duration.localeCompare(b.duration);
      }
      return 0;
    });

  const airlinesList = ['All', ...new Set(FLIGHTS_MOCK.map((f) => f.carrier))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="text-left animate-fade-in">
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Skyline Flight Search</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-2">Book premium cabins with absolute booking flexibility.</p>
      </div>

      {/* Main Search Panel */}
      <div className="rounded-2xl glass-panel p-6 sm:p-8 shadow-xl mb-8 animate-fade-in border border-slate-200/60 hover:shadow-2xl transition-all duration-505">
        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-6 items-end">
          {/* FROM INPUT WITH AUTOCOMPLETE */}
          <div className="relative md:col-span-2">
            <label className="block text-left text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Departure City</label>
            <input
              type="text"
              placeholder="Origin (e.g. New York)"
              value={fromSearch}
              onChange={(e) => {
                setFromSearch(e.target.value);
                setShowFromDropdown(true);
              }}
              onFocus={() => setShowFromDropdown(true)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm lg:text-base text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            {showFromDropdown && fromSearch && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-2xl backdrop-blur-md">
                {AIRPORTS.filter(ap => ap.city.toLowerCase().includes(fromSearch.toLowerCase()) || ap.code.toLowerCase().includes(fromSearch.toLowerCase()))
                  .map((ap) => (
                    <button
                      key={ap.code}
                      type="button"
                      onClick={() => {
                        setFromSearch(`${ap.city} (${ap.code})`);
                        setShowFromDropdown(false);
                      }}
                      className="flex w-full flex-col px-4 py-2 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-900">{ap.city} ({ap.code})</span>
                      <span className="text-xs text-slate-500">{ap.name}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* TO INPUT WITH AUTOCOMPLETE */}
          <div className="relative md:col-span-2">
            <label className="block text-left text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination City</label>
            <input
              type="text"
              placeholder="Where to?"
              value={toSearch}
              onChange={(e) => {
                setToSearch(e.target.value);
                setShowToDropdown(true);
              }}
              onFocus={() => setShowToDropdown(true)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm lg:text-base text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-all duration-300 shadow-sm"
              required
            />
            {showToDropdown && toSearch && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-2xl backdrop-blur-md">
                {AIRPORTS.filter(ap => ap.city.toLowerCase().includes(toSearch.toLowerCase()) || ap.code.toLowerCase().includes(toSearch.toLowerCase()))
                  .map((ap) => (
                    <button
                      key={ap.code}
                      type="button"
                      onClick={() => {
                        setToSearch(`${ap.city} (${ap.code})`);
                        setShowToDropdown(false);
                      }}
                      className="flex w-full flex-col px-4 py-2 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-900">{ap.city} ({ap.code})</span>
                      <span className="text-xs text-slate-500">{ap.name}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* DEPARTURE DATE */}
          <div>
            <label className="block text-left text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Depart Date</label>
            <div className="relative">
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm lg:text-base text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light] shadow-sm transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <div>
            <button
              type="submit"
              disabled={searching}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 py-3.5 px-6 text-sm lg:text-base font-bold text-white shadow-lg shadow-indigo-600/20 hover:from-indigo-700 hover:to-cyan-600 hover:scale-[1.03] hover:shadow-cyan-500/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
            >
              {searching ? (
                <RefreshCw className="animate-spin text-white" size={18} />
              ) : (
                <>
                  <span>Find Flights</span>
                  <Plane size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* EXTRA FILTERS */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="block text-left text-xs font-semibold text-slate-550 mb-1">Cabin Class</label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <div>
            <label className="block text-left text-xs font-semibold text-slate-550 mb-1">Passengers</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-200"
              >
                -
              </button>
              <span className="text-xs text-slate-900 font-semibold w-6 text-center">{passengers}</span>
              <button
                type="button"
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner Screen */}
      {searching && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="relative h-16 w-16 items-center justify-center flex">
            <div className="absolute h-16 w-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin"></div>
            <Plane className="text-indigo-600 animate-bounce" size={24} />
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-500 tracking-wider">AGGREGATING LIVE AIRLINE FLIGHT DEALS...</p>
        </div>
      )}

      {/* Flight Search Results */}
      {searched && !searching && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start animate-slide-up">
          {/* Filter Panel (Sidebar) */}
          <div className="rounded-2xl glass-panel p-6 space-y-6 border border-slate-200/60">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-indigo-600" />
                Filters
              </span>
              <button
                onClick={() => {
                  setFilterAirline('All');
                  setFilterStops('All');
                  setSortBy('price');
                }}
                className="text-xs text-indigo-600 hover:text-indigo-805 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Sort options */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort By</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('price')}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                    sortBy === 'price'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 border border-slate-200/60 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Price
                </button>
                <button
                  onClick={() => setSortBy('time')}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                    sortBy === 'time'
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 border border-slate-200/60 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Duration
                </button>
              </div>
            </div>

            {/* Airline Checkboxes */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Airlines</span>
              <div className="space-y-1">
                {airlinesList.map((airline) => (
                  <button
                    key={airline}
                    onClick={() => setFilterAirline(airline)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      filterAirline === airline
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{airline}</span>
                    {filterAirline === airline && <Check size={12} className="text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Stops filters */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Stops</span>
              <div className="space-y-1">
                {['All', '0', '1'].map((stop) => (
                  <button
                    key={stop}
                    onClick={() => setFilterStops(stop)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      filterStops === stop
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-655 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{stop === 'All' ? 'All Stops' : stop === '0' ? 'Non-stop' : `${stop} Stop`}</span>
                    {filterStops === stop && <Check size={12} className="text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="rounded-2xl bg-white/80 border border-slate-200/80 hover:border-indigo-400 p-6 lg:p-8 backdrop-blur-md transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1.5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                  {/* Carrier details */}
                  <div className="flex items-center space-x-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-650 font-black shadow-inner text-base lg:text-lg">
                      {flight.code}
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-extrabold text-slate-900">{flight.carrier}</h3>
                      <p className="text-xs lg:text-sm text-slate-500">{flight.flightNo} • {cabinClass}</p>
                    </div>
                  </div>

                  {/* Flight Timing Schedule */}
                  <div className="flex-grow grid grid-cols-3 items-center text-center max-w-sm gap-2">
                    <div className="text-left">
                      <p className="text-base lg:text-lg font-bold text-slate-900">{flight.depart}</p>
                      <p className="text-xs lg:text-sm text-slate-500">{flight.from}</p>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <span className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-widest font-semibold">{flight.duration}</span>
                      <div className="my-1.5 flex w-full items-center justify-center px-2">
                        <div className="h-[2px] w-full bg-slate-200"></div>
                        <Plane size={14} className="text-indigo-500 mx-1 shrink-0 animate-pulse" />
                        <div className="h-[2px] w-full bg-slate-200"></div>
                      </div>
                      <span className="text-[10px] lg:text-xs text-indigo-600 font-bold">{flight.stops === 0 ? 'Non-stop' : '1 Stop'}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-base lg:text-lg font-bold text-slate-900">{flight.arrive}</p>
                      <p className="text-xs lg:text-sm text-slate-500">{flight.to}</p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t border-slate-200/60 pt-4 md:border-0 md:pt-0">
                    <div>
                      <p className="text-2xl lg:text-3xl font-black text-indigo-600 tracking-tight">${flight.price}</p>
                      <p className="text-[10px] lg:text-xs text-slate-500 font-semibold text-right">{flight.seats} seats left</p>
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(flight)}
                      className="rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 px-6 py-3 text-xs lg:text-sm font-bold text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.03] hover:shadow-cyan-500/25 active:scale-[0.98] transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl glass-panel p-12 text-center text-slate-500 border border-slate-200/60">
                <SlidersHorizontal className="mx-auto text-slate-450 mb-4 animate-bounce" size={32} />
                No matching flights found. Try resetting your search filters.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Checkout Drawer Overlay */}
      {checkoutOpen && selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-slate-200 p-6 shadow-2xl">
            {bookedPass ? (
              // Success Screen / Boarding Pass Output
              <div className="text-center animate-slide-up">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200 text-indigo-650 mb-4 animate-bounce">
                  <Check size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Booking Confirmed!</h2>
                <p className="text-xs text-slate-500 mt-1">Your electronic boarding pass has been registered.</p>

                {/* BOARDING PASS CARD TICKET */}
                <div className="mt-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 p-5 text-left relative overflow-hidden shadow-md">
                  {/* Left-side punchouts decoration */}
                  <div className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 rounded-r-full bg-slate-50 border-r border-indigo-100"></div>
                  {/* Right-side punchouts decoration */}
                  <div className="absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 rounded-l-full bg-slate-50 border-l border-indigo-100"></div>

                  <div className="flex justify-between items-center pb-3 border-b border-indigo-100 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">BOARDING PASS</span>
                    <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                      <Ticket size={12} />
                      {bookedPass.carrier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 items-center gap-2 mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">FROM</span>
                      <span className="text-lg font-bold text-slate-900 leading-none">{bookedPass.from}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{bookedPass.fromCity}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Plane size={14} className="text-indigo-500" />
                      <div className="w-full h-[1px] bg-indigo-100 my-1"></div>
                      <span className="text-[9px] text-slate-400">{bookedPass.flightNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">TO</span>
                      <span className="text-lg font-bold text-slate-900 leading-none">{bookedPass.to}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{bookedPass.toCity}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-indigo-100 border-dashed mb-4">
                    <div>
                      <span className="text-[9px] text-slate-400 block">PASSENGER</span>
                      <span className="text-sm font-semibold text-slate-900 truncate block">{selectedPassenger}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block">SEAT / CLASS</span>
                      <span className="text-sm font-semibold text-indigo-600 block">{bookedPass.seat} / {bookedPass.classType}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block">DATE & TIME</span>
                      <span className="text-xs font-semibold text-slate-900">{bookedPass.date}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Boarding: {bookedPass.time}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-100 shadow-inner">
                      {/* Simple mock QR pattern */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${bookedPass.qrData}`}
                        alt="Boarding QR"
                        className="h-12 w-12"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutOpen(false);
                    setBookedPass(null);
                  }}
                  className="mt-6 w-full rounded-xl bg-white border border-slate-200 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 shadow-sm transition-all"
                >
                  Return to Search
                </button>
              </div>
            ) : (
              // Payment & Confirm Details Screen
              <div className="animate-fade-in">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Review Flight Details</h2>
                  <button 
                    onClick={() => setCheckoutOpen(false)}
                    className="text-slate-500 hover:text-slate-850"
                  >
                    Close
                  </button>
                </div>

                {/* Mini details summary */}
                <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">{selectedFlight.carrier} ({selectedFlight.flightNo})</span>
                    <span className="text-xs font-semibold text-indigo-600">{cabinClass}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-slate-650">
                    <span>{selectedFlight.fromCity} &rarr; {selectedFlight.toCity}</span>
                    <span>{selectedFlight.depart} ({selectedFlight.duration})</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Select Passenger */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-550 uppercase tracking-wider mb-2">Select Passenger</label>
                    <select
                      value={selectedPassenger}
                      onChange={(e) => setSelectedPassenger(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
                    >
                      {userProfile.savedPassengers.map(p => (
                        <option key={p.id} value={p.name}>{p.name} ({p.type})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Payment Method */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-550 uppercase tracking-wider mb-2">Payment Method</label>
                    <select
                      value={selectedPayment}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none [color-scheme:light]"
                    >
                      {userProfile.savedPayments.map(p => (
                        <option key={p.id} value={p.id}>{p.type} - {p.number}</option>
                      ))}
                    </select>
                    <div className="mt-2 flex items-center space-x-1 text-slate-500">
                      <ShieldCheck size={14} className="text-indigo-600" />
                      <span className="text-[10px] font-medium tracking-wide">SSL SECURED ENCRYPTED TRANSACTION MOCK</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-4 flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Fare</span>
                    <span className="text-2xl font-extrabold text-indigo-600">${selectedFlight.price}</span>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={bookingProgress}
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/35 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {bookingProgress ? (
                      <span className="flex items-center space-x-2">
                        <RefreshCw className="animate-spin" size={14} />
                        <span>Securing Seat...</span>
                      </span>
                    ) : (
                      'Confirm & Book'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
