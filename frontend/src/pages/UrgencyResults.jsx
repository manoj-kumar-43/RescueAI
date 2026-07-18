import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function UrgencyResults() {
  const { triageResult, setActivePage } = useContext(AppContext);

  // Fallback defaults if triageResult is null (e.g. if user navigates directly)
  const defaultResult = {
    complaint: 'Severe abdominal pain (Right Lower Quadrant)',
    onset: '4 hours ago',
    painLevel: 7,
    urgency: 'URGENT',
    recommendations: [
      'Go to nearest Urgent Care or Hospital Emergency Room.',
      'Bring your ID and Insurance Card.',
      'Do not eat or drink if you suspect surgery is needed.',
      'Have someone drive you if possible.'
    ]
  };

  const result = triageResult || defaultResult;

  // Determine styles and titles based on Urgency status
  let theme = {
    bgColor: 'bg-[#FFF8E1]', // Amber fallback
    borderColor: 'border-[#FFB300]',
    textColor: 'text-on-surface',
    accentColor: 'text-[#FFB300]',
    statusText: result.urgency,
    icon: 'warning'
  };

  if (result.urgency === 'CRITICAL') {
    theme = {
      bgColor: 'bg-error-container',
      borderColor: 'border-error',
      textColor: 'text-on-error-container',
      accentColor: 'text-error',
      statusText: 'CRITICAL WARNING',
      icon: 'warning'
    };
  } else if (result.urgency === 'URGENT') {
    theme = {
      bgColor: 'bg-[#FFF8E1]',
      borderColor: 'border-[#FFB300]',
      textColor: 'text-on-surface',
      accentColor: 'text-[#FFB300]',
      statusText: 'URGENT CARE RECOMMENDED',
      icon: 'error_med'
    };
  } else if (result.urgency === 'MODERATE') {
    theme = {
      bgColor: 'bg-surface-container-low',
      borderColor: 'border-primary-container',
      textColor: 'text-on-surface',
      accentColor: 'text-primary',
      statusText: 'MODERATE STATUS',
      icon: 'medical_information'
    };
  } else if (result.urgency === 'NON-EMERGENCY') {
    theme = {
      bgColor: 'bg-tertiary-fixed-dim/20',
      borderColor: 'border-tertiary',
      textColor: 'text-on-surface',
      accentColor: 'text-tertiary',
      statusText: 'NON-EMERGENCY CARE',
      icon: 'check_circle'
    };
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-container-margin-mobile md:p-container-margin-desktop flex flex-col gap-stack-lg">
      
      {/* Urgency Banner */}
      <div className={`${theme.bgColor} border-l-4 ${theme.borderColor} p-stack-md rounded-r-lg shadow-sm flex items-start gap-stack-md`}>
        <span className={`material-symbols-outlined ${theme.accentColor} text-headline-lg`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {theme.icon}
        </span>
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-unit uppercase tracking-wide font-black">
            {theme.statusText}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {result.urgency === 'CRITICAL' && "Your symptoms indicate a life-threatening condition. Contact emergency services or go to the nearest ER immediately."}
            {result.urgency === 'URGENT' && "Your symptoms indicate a condition requiring prompt medical attention. Please proceed to the nearest Urgent Care or Hospital."}
            {result.urgency === 'MODERATE' && "Your symptoms are non-critical but need evaluation. Consider visiting an Urgent Care center or contacting your primary care doctor."}
            {result.urgency === 'NON-EMERGENCY' && "Your symptoms appear minor. You can monitor them at home or seek regular outpatient advice."}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
        
        {/* Next Steps */}
        <section className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl shadow-sm">
          <h3 className="font-action-xl text-action-xl text-primary flex items-center gap-unit mb-stack-md font-bold">
            <span className="material-symbols-outlined">checklist</span>
            Next Steps
          </h3>
          <ul className="space-y-stack-sm font-body-md text-body-md text-on-surface">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-unit">
                <span className="material-symbols-outlined text-primary mt-1 text-sm">
                  arrow_right
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Symptoms Summary */}
        <section className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-xl shadow-sm">
          <h3 className="font-action-xl text-action-xl text-primary flex items-center gap-unit mb-stack-md font-bold">
            <span className="material-symbols-outlined">medical_information</span>
            Symptoms Summary
          </h3>
          <div className="font-body-md text-body-md text-on-surface space-y-unit">
            <p><strong>Primary Complaint:</strong> {result.complaint}</p>
            <p><strong>Onset:</strong> {result.onset || 'Not specified'}</p>
            <p><strong>Pain Level:</strong> {result.painLevel}/10</p>
            <p><strong>Status Category:</strong> <span className={`font-bold ${theme.accentColor}`}>{result.urgency}</span></p>
          </div>
          <div className="mt-stack-md bg-surface-container p-unit rounded text-on-surface-variant font-body-md text-sm border-l-2 border-outline">
            Show this summary to medical professionals upon arrival.
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setActivePage('hospitals')}
          className="bg-primary text-on-primary font-action-xl text-action-xl py-4 px-stack-lg rounded-xl shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-stack-md min-h-[56px]"
        >
          <span className="material-symbols-outlined">local_hospital</span>
          Find Nearby Hospitals
        </button>
        
        <button
          onClick={() => setActivePage('triage')}
          className="bg-surface-container-high text-on-surface font-action-xl text-action-xl py-4 px-stack-lg rounded-xl border border-outline-variant hover:bg-surface-variant transition-all flex items-center justify-center gap-stack-md min-h-[56px]"
        >
          <span className="material-symbols-outlined">refresh</span>
          Re-evaluate Symptoms
        </button>
      </div>

    </div>
  );
}
