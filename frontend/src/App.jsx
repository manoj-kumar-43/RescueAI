import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import EmergencyBanner from './components/EmergencyBanner';
import AuthModal from './components/AuthModal';
import NotificationToast from './components/NotificationToast';

// Pages
import LandingPage from './pages/LandingPage';
import TriageInput from './pages/TriageInput';
import UrgencyResults from './pages/UrgencyResults';
import FindHospitals from './pages/FindHospitals';
import MedicalHistory from './pages/MedicalHistory';
import SafetyDashboard from './pages/SafetyDashboard';
import HowItWorks from './pages/HowItWorks';
import EmergencyContacts from './pages/EmergencyContacts';

function AppContent() {
  const { activePage } = useContext(AppContext);

  // Render active page view
  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'triage':
        return <TriageInput />;
      case 'urgency-results':
        return <UrgencyResults />;
      case 'hospitals':
        return <FindHospitals />;
      case 'history':
        return <MedicalHistory />;
      case 'safety':
        return <SafetyDashboard />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'contacts':
        return <EmergencyContacts />;
      default:
        return <LandingPage />;
    }
  };

  const showSidebar = activePage !== 'landing';

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pt-16 selection:bg-primary selection:text-on-primary">
      {/* Top Navbar */}
      <Navigation />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar (Desktop Only, hidden on landing page) */}
        {showSidebar && <Sidebar />}

        {/* Main Content Canvas */}
        <div className={`flex-1 flex flex-col w-full min-h-[calc(100vh-64px)] pb-24 md:pb-6 overflow-y-auto ${
          showSidebar ? 'md:pl-64' : ''
        }`}>
          {/* Main Area */}
          <main className="flex-grow p-4 md:p-6">
            {/* Global Emergency Warnings Banner */}
            {activePage !== 'landing' && <EmergencyBanner />}
            {renderPage()}
          </main>

          {/* Footer (Desktop/Wide screens or landing only) */}
          <footer className="w-full py-stack-lg px-container-margin-desktop flex flex-col md:flex-row justify-between items-center bg-surface-container-highest dark:bg-inverse-surface border-t border-outline-variant/30 text-on-surface-variant text-xs mt-auto">
            <div className="font-body-md uppercase mb-4 md:mb-0">
              © 2026 RescueAI. Not a replacement for professional medical advice.
            </div>
            <div className="flex gap-4">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActivePage('how-it-works'); }}
                className="font-label-bold hover:text-secondary transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActivePage('contacts'); }}
                className="font-label-bold hover:text-secondary transition-colors"
              >
                Emergency Contacts
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Simulating terms description..."); }}
                className="font-label-bold hover:text-secondary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Simulating privacy statement..."); }}
                className="font-label-bold hover:text-secondary transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Hidden on wide screens) */}
      <BottomNav />

      {/* Auth Modal */}
      <AuthModal />

      {/* Notification Toast */}
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
