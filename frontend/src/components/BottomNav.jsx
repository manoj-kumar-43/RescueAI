import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function BottomNav() {
  const { activePage, setActivePage } = useContext(AppContext);

  const navItems = [
    { id: 'triage', label: 'Triage', icon: 'medical_services' },
    { id: 'hospitals', label: 'Hospitals', icon: 'local_hospital' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'safety', label: 'Safety', icon: 'info' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 pb-safe bg-surface-container dark:bg-inverse-surface shadow-lg rounded-t-xl border-t border-outline-variant/30">
      {navItems.map((item) => {
        const isActive = activePage === item.id || (item.id === 'triage' && activePage === 'urgency-results');
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center justify-center py-1 transition-transform active:scale-90 ${
              isActive 
                ? 'bg-primary-container text-on-primary-container rounded-full px-4' 
                : 'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary'
            }`}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-bold text-label-bold text-[10px] mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
