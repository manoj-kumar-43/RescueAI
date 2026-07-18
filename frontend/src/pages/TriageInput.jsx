import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function TriageInput() {
  const {
    symptomText,
    setSymptomText,
    triageDuration,
    setTriageDuration,
    triagePain,
    setTriagePain,
    voiceActive,
    setVoiceActive,
    analyzeSymptoms
  } = useContext(AppContext);

  // Simulate Voice Dictation
  const handleVoiceToggle = (e) => {
    e.preventDefault();
    if (!voiceActive) {
      setVoiceActive(true);
      // Simulate typing symptoms over time
      setTimeout(() => {
        setSymptomText("Severe chest pain spreading to my left shoulder and arm. Having difficulty breathing and sweating.");
        setVoiceActive(false);
      }, 3000);
    } else {
      setVoiceActive(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto pt-4 pb-12 px-container-margin-mobile md:px-container-margin-desktop">
      
      {/* Progress Stepper */}
      <div className="w-full mb-stack-lg flex items-center justify-between relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-variant -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1 bg-primary -z-10 rounded-full transition-all duration-500"></div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-bold text-label-bold shadow-sm">
            1
          </div>
          <span className="font-label-bold text-label-bold text-primary hidden md:block">Symptoms</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-label-bold text-label-bold border-2 border-surface-variant">
            2
          </div>
          <span className="font-label-bold text-label-bold text-outline hidden md:block">Details</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-label-bold text-label-bold border-2 border-surface-variant">
            3
          </div>
          <span className="font-label-bold text-label-bold text-outline hidden md:block">Action</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Primary Triage Input (Left Bento) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-gutter">
          
          <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-outline-variant flex flex-col h-full min-h-[300px]">
            <label className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-stack-sm" htmlFor="symptom-input">
              Describe what is happening...
            </label>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              Please provide as much detail as possible. Mention any pain, breathing issues, or loss of consciousness.
            </p>
            
            <div className="relative flex-grow flex flex-col min-h-[180px]">
              <textarea
                id="symptom-input"
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                className="w-full flex-grow p-4 rounded-lg bg-surface border border-outline-variant text-body-lg font-body-lg text-on-surface focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all placeholder:text-outline"
                placeholder="Type symptoms here... (e.g., severe chest pain)"
              />
              
              {/* Voice Input Button inside textarea */}
              <button
                onClick={handleVoiceToggle}
                className={`absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all z-10 ${
                  voiceActive 
                    ? 'bg-error text-on-error animate-pulse' 
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                title={voiceActive ? 'Listening...' : 'Simulate Voice Input'}
              >
                {!voiceActive ? (
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mic
                  </span>
                ) : (
                  <div className="waveform">
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Progressive Disclosure (Appears when text is entered) */}
          <AnimatePresence>
            {symptomText.length > 5 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 15 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-outline-variant"
              >
                <h3 className="font-headline-md text-headline-md font-semibold mb-stack-md">
                  Additional Context Needed
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface mb-2 block">
                      How long has this been happening?
                    </label>
                    <select
                      value={triageDuration}
                      onChange={(e) => setTriageDuration(e.target.value)}
                      className="w-full p-3 rounded-lg bg-surface border border-outline-variant text-body-md font-body-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option>Select duration</option>
                      <option>Just started (less than 15 mins)</option>
                      <option>15 mins to 1 hour</option>
                      <option>1 to 4 hours</option>
                      <option>More than 4 hours</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="font-label-bold text-label-bold text-on-surface mb-2 block">
                      Pain severity ({triagePain}/10)
                    </label>
                    <div className="flex items-center gap-4 bg-surface border border-outline-variant p-3 rounded-lg">
                      <span className="font-label-bold text-label-bold text-on-surface-variant text-sm">Mild</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={triagePain}
                        onChange={(e) => setTriagePain(parseInt(e.target.value))}
                        className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span className="font-label-bold text-label-bold text-secondary font-bold text-sm">Severe</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Info (Right Bento) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-gutter">
          {/* Action Card */}
          <div className="bg-primary-container rounded-xl p-stack-md shadow-md flex flex-col justify-center items-center text-center text-on-primary-container">
            <span className="material-symbols-outlined text-5xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
              medical_services
            </span>
            <h3 className="font-headline-md text-headline-md font-bold mb-1">Analyze Symptoms</h3>
            <p className="font-body-md text-body-md opacity-90 mb-stack-md">
              Submit to get triage recommendations and nearest hospitals.
            </p>
            <button
              onClick={analyzeSymptoms}
              disabled={symptomText.trim().length === 0}
              className={`w-full font-action-xl text-action-xl py-4 rounded-lg shadow-sm transition-colors min-h-[56px] ${
                symptomText.trim().length === 0 
                  ? 'bg-on-primary/40 text-on-primary-container/50 cursor-not-allowed'
                  : 'bg-on-primary text-primary hover:bg-surface-variant'
              }`}
            >
              Proceed
            </button>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-outline-variant">
            <h3 className="font-label-bold text-label-bold text-outline uppercase tracking-wider mb-stack-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">contact_phone</span> 
              Local Contacts
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-variant">
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface">Ambulance / Police</p>
                  <p className="font-body-md text-body-md text-secondary font-bold">911</p>
                </div>
                <button 
                  onClick={() => alert("Dialing 911...")}
                  className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:opacity-90"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    call
                  </span>
                </button>
              </li>
              <li className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-variant">
                <div>
                  <p className="font-label-bold text-label-bold text-on-surface">Poison Control</p>
                  <p className="font-body-md text-body-md text-primary font-bold">800-222-1222</p>
                </div>
                <button 
                  onClick={() => alert("Dialing Poison Control...")}
                  className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:opacity-90"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    call
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
