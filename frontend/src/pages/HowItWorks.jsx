import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function HowItWorks() {
  const { setActivePage } = useContext(AppContext);

  const steps = [
    {
      num: 1,
      title: 'Input Validation',
      desc: 'Ensuring your description is clear and actionable to provide the best clinical insights.',
      border: 'bg-primary'
    },
    {
      num: 2,
      title: 'Critical Warning Sign Detection',
      desc: 'Hardcoded rules that immediately trigger emergency alerts for life-threatening symptoms (chest pain, stroke).',
      border: 'bg-secondary',
      highlight: true
    },
    {
      num: 3,
      title: 'Safety Rules Engine',
      desc: 'A robust layer that prevents AI from making clinical decisions in isolation, assuring safety limits.',
      border: 'bg-tertiary-container'
    },
    {
      num: 4,
      title: 'Structured Data Extraction',
      desc: 'AI translates natural language into structured medical context for first responders and ER triage teams.',
      border: 'bg-primary'
    },
    {
      num: 5,
      title: 'Triage Engine',
      desc: 'Logic-based urgency level calculation based on duration, severity, and critical indicator signs.',
      border: 'bg-primary'
    },
    {
      num: 6,
      title: 'Hospital Capability Matching',
      desc: 'Routing you to the facility best equipped for your specific needs, rather than just the closest location.',
      border: 'bg-primary'
    }
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-stack-lg flex flex-col gap-stack-lg overflow-y-auto">
      
      {/* Hero Header */}
      <section className="w-full text-center py-6">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4 font-black">
          Safety-First Intelligence.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
          How RescueAI coordinates rapid triage and hospital routing while prioritizing your safety.
        </p>
      </section>

      {/* Process Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div 
              key={step.num}
              className={`bg-surface-container-lowest p-6 rounded-xl border relative overflow-hidden group shadow-sm transition-all hover:-translate-y-1 ${
                step.highlight ? 'border-secondary shadow-md' : 'border-outline-variant'
              }`}
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${step.border}`}></div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-headline-md text-headline-md shadow-inner ${
                  step.highlight ? 'bg-secondary-fixed text-secondary' : 'bg-surface-container-high text-primary'
                }`}>
                  {step.num}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                  {step.title}
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Commitment card */}
      <section className="w-full bg-secondary-fixed p-8 rounded-xl border border-secondary flex flex-col md:flex-row items-center gap-6 mt-6 mb-6">
        <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          warning
        </span>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-secondary-fixed-variant mb-2 font-bold">
            Safety Commitment
          </h3>
          <p className="font-body-md text-body-md text-on-secondary-fixed">
            RescueAI is a decision-support tool, not a replacement for professional medical advice or 911. In case of a severe emergency, always contact your local emergency services immediately.
          </p>
        </div>
      </section>

      {/* Return Home Button */}
      <button 
        onClick={() => setActivePage('landing')}
        className="self-center bg-primary text-on-primary px-8 py-3 rounded-lg font-action-xl hover:bg-primary-container shadow"
      >
        Return to Home Screen
      </button>

    </div>
  );
}
