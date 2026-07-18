import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Navigation() {
  const { setActivePage } = useContext(AppContext);

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
      </div>
    </nav>
  );
}
