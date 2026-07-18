import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function SafetyDashboard() {
  const {
    setActivePage,
    startNewTriage,
    notifyContacts,
    recentActivity,
    medicalProfile
  } = useContext(AppContext);

  return (
    <div className="flex-1 w-full pt-4 pb-12 px-container-margin-mobile md:px-container-margin-desktop max-w-7xl mx-auto flex flex-col gap-stack-lg">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background font-black">
            Safety Dashboard
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Your central hub for emergency readiness and status.
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant shadow-sm">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="font-label-bold text-label-bold font-bold">System Online</span>
        </div>
      </div>

      {/* Emergency Quick Actions (Top Priority) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <button
          onClick={() => alert("Calling 911 emergency services...")}
          className="bg-secondary text-on-secondary h-[72px] rounded-xl flex items-center justify-center gap-3 font-action-xl text-action-xl shadow-lg hover:bg-opacity-90 transition-all active:scale-95 group animate-emergency-pulse"
        >
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            call
          </span>
          Call 911
        </button>
        
        <button
          onClick={startNewTriage}
          className="bg-primary text-on-primary h-[72px] rounded-xl flex items-center justify-center gap-3 font-action-xl text-action-xl shadow-lg hover:bg-opacity-90 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            add_circle
          </span>
          Start New Triage
        </button>
        
        <button
          onClick={notifyContacts}
          className="bg-surface-container-highest text-on-surface h-[72px] rounded-xl flex items-center justify-center gap-3 font-action-xl text-action-xl border border-outline-variant hover:bg-surface-variant transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            campaign
          </span>
          Notify Contacts
        </button>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Safety Status Overview & Timeline (Left Column) */}
        <div className="lg:col-span-8 flex flex-col gap-gutter">
          
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full border-8 border-tertiary flex items-center justify-center flex-shrink-0 relative overflow-hidden bg-surface-container-low">
              <span className="material-symbols-outlined text-tertiary text-5xl absolute z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            
            <div className="flex flex-col text-center md:text-left w-full">
              <h2 className="font-headline-md text-headline-md text-on-background mb-1 font-bold">
                Status: Secure
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                No active emergencies detected in your immediate vicinity. Last updated 2 mins ago.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button 
                  onClick={() => setActivePage('history')}
                  className="bg-surface-container text-on-surface px-4 py-2 rounded-lg font-label-bold text-label-bold border border-outline-variant hover:bg-surface-variant transition-colors"
                >
                  View Recent Triage
                </button>
                <button 
                  onClick={() => alert("Updating GPS location coordinates...")}
                  className="bg-surface-container text-on-surface px-4 py-2 rounded-lg font-label-bold text-label-bold border border-outline-variant hover:bg-surface-variant transition-colors"
                >
                  Update Location
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex-grow">
            <h3 className="font-headline-md text-headline-md text-on-background mb-6 flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Activity
            </h3>
            
            <div className="relative pl-6 border-l-2 border-surface-container-highest flex flex-col gap-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative">
                  <span className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-lowest"></span>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-label-bold text-label-bold text-on-background font-bold">
                      {activity.title}
                    </h4>
                    <span className="font-body-md text-body-md text-on-surface-variant text-sm">
                      {activity.time}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Content (Right Column) */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          
          {/* Health Profile Summary card */}
          <div 
            onClick={() => setActivePage('history')}
            className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm relative overflow-hidden group cursor-pointer hover:border-primary transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_information
              </span>
            </div>
            
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-on-background mb-4 font-bold">
                Medical ID
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="font-body-md text-body-md text-on-surface-variant">Blood Type</span>
                  <span className="font-label-bold text-label-bold text-secondary font-bold">
                    {medicalProfile.bloodType} (O-Negative)
                  </span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="font-body-md text-body-md text-on-surface-variant">Allergies</span>
                  <span className="font-label-bold text-label-bold text-secondary font-bold">
                    {medicalProfile.allergies[0]?.name || 'None'}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="font-body-md text-body-md text-on-surface-variant">Conditions</span>
                  <span className="font-label-bold text-label-bold text-on-background font-bold">
                    {medicalProfile.conditions[0]?.name || 'None'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActivePage('history')}
                className="mt-4 w-full text-center text-primary font-label-bold text-label-bold py-2 hover:bg-surface-container-low rounded-lg transition-colors font-semibold"
              >
                View Full History →
              </button>
            </div>
          </div>

          {/* Nearby Help Mini-Map shortcut */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col flex-grow">
            <div 
              className="h-32 bg-surface-container-low relative bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTNS4hdfYpuL0kv4i2QzHj4a4CzfSJdAMpBkLedRxajVMDhk5gYvMCsq84DSYMmhyYIOLmkdHIvBt7QFHfTxnNMmiv2OP-4sh-gjuPh_kiaN6MIz-EHoP9RHBmR-st6FNMPkDcTgWAEzkkN3eBOjCYeDG9SdUp9a4i0PYJgzgzdLHWZnM-d1zmxhIipZnDhY8lKptYONxoo7laKL7n_vHYQ6pBAa4oEuTg5WYoUmiK9irYAHkmRtBLDAkgu6JS0nAt0Daos4CGyWe8')" }}
            >
              {/* Simulated Map Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container/55 backdrop-blur-[2px]">
                <button
                  onClick={() => setActivePage('hospitals')}
                  className="bg-surface-container-lowest text-primary px-4 py-2 rounded-full font-label-bold text-label-bold border border-outline-variant shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined">explore</span>
                  Open Map View
                </button>
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-xs font-bold">
                Nearest Facilities
              </h3>
              
              <div 
                onClick={() => setActivePage('hospitals')}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-outline-variant"
              >
                <div>
                  <h4 className="font-label-bold text-label-bold text-on-background font-bold">Mercy General Hospital</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">1.2 miles away</p>
                </div>
                <div className="text-right">
                  <span className="block font-label-bold text-label-bold text-tertiary font-bold">15m wait</span>
                </div>
              </div>
              
              <div 
                onClick={() => setActivePage('hospitals')}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-outline-variant"
              >
                <div>
                  <h4 className="font-label-bold text-label-bold text-on-background font-bold">CityMD Urgent Care</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">2.4 miles away</p>
                </div>
                <div className="text-right">
                  <span className="block font-label-bold text-label-bold text-primary font-bold">5m wait</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
