import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Navigation() {
  const { setActivePage, isAuthenticated, user, setShowAuthModal, logout } = useContext(AppContext);

  return (
    <nav className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop h-16 fixed top-0 z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline shadow-sm">
      <div
        className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setActivePage('landing')}
      >
        RescueAI
      </div>
      <div className="flex items-center gap-unit">
        <a
          href="tel:911"
          className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            alert("Simulating call to 911...");
          }}
        >
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            phone_in_talk
          </span>
        </a>
        <span
          className="text-primary dark:text-inverse-primary font-bold hidden md:block cursor-pointer hover:underline"
          onClick={() => alert("Simulating call to 911...")}
        >
          Call 911
        </span>

        {/* Auth Button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2 ml-2">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-bold text-label-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <button
              onClick={logout}
              className="text-on-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-full flex items-center justify-center"
              title="Logout"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>
                logout
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold text-label-bold text-sm ml-2 hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              person
            </span>
            <span className="hidden md:inline">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
