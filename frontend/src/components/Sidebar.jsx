import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Sidebar() {
  const { activePage, setActivePage } = useContext(AppContext);

  const navItems = [
    { id: 'triage', label: 'Emergency Triage', icon: 'emergency' },
    { id: 'hospitals', label: 'Find Hospitals', icon: 'map' },
    { id: 'history', label: 'Medical History', icon: 'account_circle' },
    { id: 'safety', label: 'Safety Info', icon: 'security' },
  ];

  return (
    <aside className="hidden md:flex flex-col py-stack-md px-unit bg-surface-container-low dark:bg-surface-container-lowest h-full w-64 left-0 fixed shadow-sm pt-20 z-40 border-r border-outline-variant">
      <div className="mb-stack-lg px-4">
        <h2 className="font-headline-md text-headline-md font-black text-secondary">RescueAI</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Emergency Support</p>
      </div>
      
      <nav className="flex-1 flex flex-col gap-unit">
        {navItems.map((item) => {
          const isActive = activePage === item.id || 
            (item.id === 'triage' && activePage === 'urgency-results');
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left font-bold rounded-lg flex items-center gap-4 px-4 py-3 transition-all ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container shadow-md translate-x-1' 
                  : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto p-4">
        <button 
          onClick={() => alert("Simulating Emergency Call to 911...")}
          className="w-full bg-secondary text-on-secondary font-action-xl text-action-xl rounded-full py-4 shadow-md flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors animate-emergency-pulse"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            call
          </span>
          Emergency Call
        </button>
      </div>
    </aside>
  );
}
