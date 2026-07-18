import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function EmergencyBanner() {
  const { systemAlertActive, setSystemAlertActive } = useContext(AppContext);

  if (!systemAlertActive) return null;

  return (
    <div className="w-full bg-secondary text-on-secondary p-4 rounded-xl mb-stack-md flex items-start gap-4 shadow-lg border-2 border-secondary-container animate-bounce">
      <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
        warning
      </span>
      <div>
        <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-wider">
          Critical Signs Detected
        </h2>
        <p className="font-body-md text-body-md mt-1">
          Immediate medical attention may be required. Do you want to call emergency services now?
        </p>
        <div className="mt-4 flex gap-3">
          <button 
            onClick={() => alert("Calling 911...")}
            className="bg-on-secondary text-secondary font-action-xl text-action-xl px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-surface-dim transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              phone_in_talk
            </span>
            Call 911
          </button>
          <button 
            className="border border-on-secondary text-on-secondary font-label-bold text-label-bold px-4 py-2 rounded-lg hover:bg-secondary-container transition-colors"
            onClick={() => setSystemAlertActive(false)}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
