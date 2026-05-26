import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Taxi from './pages/Taxi';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [toasts, setToasts] = useState([]);
  
  // State for prefilling search forms between pages
  const [flightSearchData, setFlightSearchData] = useState(null);
  const [taxiSearchData, setTaxiSearchData] = useState(null);

  // Global user session state
  const [userProfile, setUserProfile] = useState({
    name: 'Alexander Vance',
    email: 'alexander.vance@gmail.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Springfield',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    preferences: {
      seat: 'Window',
      meal: 'Vegan',
      ecoFriendly: true,
      classType: 'Business'
    },
    savedPassengers: [
      { id: 1, name: 'Alexander Vance', type: 'Adult (You)' },
      { id: 2, name: 'Elena Vance', type: 'Child' }
    ],
    savedPayments: [
      { id: 1, type: 'Visa', number: '•••• •••• •••• 8829', expiry: '09/29', holder: 'ALEXANDER VANCE' },
      { id: 2, type: 'MasterCard', number: '•••• •••• •••• 4410', expiry: '12/28', holder: 'ALEXANDER VANCE' }
    ]
  });

  // Mock booking history state
  const [bookings, setBookings] = useState([
    {
      id: 'B-1002',
      type: 'flight',
      carrier: 'Air France',
      carrierCode: 'AF',
      flightNumber: 'AF-104',
      from: 'JFK',
      fromCity: 'New York',
      to: 'CDG',
      toCity: 'Paris',
      date: '2026-05-28',
      time: '10:30 AM',
      duration: '7h 15m',
      price: 620,
      seat: '12A',
      classType: 'Business',
      status: 'Active',
      qrData: 'FLIGHT-AF104-VANCE-12A'
    },
    {
      id: 'B-0988',
      type: 'taxi',
      vehicleType: 'Luxury Sedan',
      pickup: '742 Evergreen Terrace',
      drop: 'JFK International Airport',
      date: '2026-05-28',
      time: '07:00 AM',
      fare: 54.20,
      distance: '18.4 mi',
      status: 'Scheduled'
    },
    {
      id: 'B-0422',
      type: 'flight',
      carrier: 'Delta Air Lines',
      carrierCode: 'DL',
      flightNumber: 'DL-245',
      from: 'LHR',
      fromCity: 'London',
      to: 'JFK',
      toCity: 'New York',
      date: '2026-03-15',
      time: '02:15 PM',
      duration: '8h 30m',
      price: 450,
      seat: '24C',
      classType: 'Economy',
      status: 'Completed',
      qrData: 'FLIGHT-DL245-VANCE-24C'
    }
  ]);

  // Utility to push notifications
  const triggerToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleBookFlight = (flightBooking) => {
    setBookings((prev) => [flightBooking, ...prev]);
    triggerToast(`Flight to ${flightBooking.toCity} booked successfully!`);
  };

  const handleBookTaxi = (taxiBooking) => {
    setBookings((prev) => [taxiBooking, ...prev]);
    triggerToast(`Taxi scheduled to ${taxiBooking.drop.split(',')[0]}!`);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setFlightSearchData={setFlightSearchData}
            setTaxiSearchData={setTaxiSearchData}
            onToast={triggerToast}
          />
        );
      case 'flights':
        return (
          <Flights
            prefillData={flightSearchData}
            clearPrefill={() => setFlightSearchData(null)}
            onBookFlight={handleBookFlight}
            userProfile={userProfile}
          />
        );
      case 'taxi':
        return (
          <Taxi
            prefillData={taxiSearchData}
            clearPrefill={() => setTaxiSearchData(null)}
            onBookTaxi={handleBookTaxi}
            userProfile={userProfile}
          />
        );
      case 'profile':
        return (
          <Profile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            bookings={bookings}
            onToast={triggerToast}
          />
        );
      case 'login':
        return <Login setCurrentPage={setCurrentPage} onToast={triggerToast} />;
      case 'signup':
        return <Signup setCurrentPage={setCurrentPage} onToast={triggerToast} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact onToast={triggerToast} />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setFlightSearchData={setFlightSearchData}
            setTaxiSearchData={setTaxiSearchData}
            onToast={triggerToast}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-cyan-500/3 blur-[100px] pointer-events-none"></div>

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} onToast={triggerToast} />
      
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
