import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function FindHospitals() {
  const { hospitalsList, fetchHospitals, hospitalsLoading } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All ERs');
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  // Add default markerPos for hospitals that don't have top/left positioning
  const defaultMarkerPositions = [
    { top: '35%', left: '52%' },
    { top: '50%', left: '33%' },
    { top: '65%', left: '60%' },
    { top: '40%', left: '70%' },
    { top: '55%', left: '45%' },
    { top: '30%', left: '40%' },
  ];

  const hospitals = hospitalsList.map((h, index) => {
    let markerPos;
    if (h.markerPos?.top && h.markerPos?.left) {
      markerPos = h.markerPos;
    } else if (h.markerPos?.lat && h.markerPos?.lng) {
      const latRange = { min: 36.9, max: 38.6 };
      const lngRange = { min: -121.5, max: -120.0 };
      const topPct = 10 + ((latRange.max - h.markerPos.lat) / (latRange.max - latRange.min)) * 80;
      const leftPct = 10 + ((h.markerPos.lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80;
      markerPos = { top: `${Math.min(90, Math.max(10, topPct))}%`, left: `${Math.min(90, Math.max(10, leftPct))}%` };
    } else {
      markerPos = defaultMarkerPositions[index % defaultMarkerPositions.length];
    }
    return {
      ...h,
      markerPos,
      tag: index === 0 ? 'Best Match' : undefined,
    };
  });

  const filteredHospitals = hospitals.filter(h => {
    const nameMatch = h.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'All ERs') return nameMatch;
    if (filterType === 'Urgent Care') return nameMatch && h.type === 'Urgent Care';
    if (filterType === 'Trauma Center') return nameMatch && h.type === 'Trauma Center';
    if (filterType === 'Pediatrics') return nameMatch && h.type === 'Pediatrics';

    return nameMatch;
  });

  return (
    <main className="flex-1 flex flex-col md:flex-row relative w-full h-[calc(100vh-64px)] overflow-hidden">
      {/* Map Area */}
      <div className="flex-1 relative bg-surface-container h-full w-full">
        <img
          className="absolute inset-0 w-full h-full object-cover select-none"
          alt="RescueAI light-themed functional emergency map view"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTNS4hdfYpuL0kv4i2QzHj4a4CzfSJdAMpBkLedRxajVMDhk5gYvMCsq84DSYMmhyYIOLmkdHIvBt7QFHfTxnNMmiv2OP-4sh-gjuPh_kiaN6MIz-EHoP9RHBmR-st6FNMPkDcTgWAEzkkN3eBOjCYeDG9SdUp9a4i0PYJgzgzdLHWZnM-d1zmxhIipZnDhY8lKptYONxoo7laKL7n_vHYQ6pBAa4oEuTg5WYoUmiK9irYAHkmRtBLDAkgu6JS0nAt0Daos4CGyWe8"
        />

        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 hidden md:flex">
          <button
            onClick={() => alert("Finding your current location...")}
            className="bg-surface text-on-surface p-2 rounded shadow-md hover:bg-surface-variant transition-colors flex items-center justify-center h-10 w-10 border border-outline-variant"
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <button
            onClick={() => alert("Zooming in...")}
            className="bg-surface text-on-surface p-2 rounded shadow-md hover:bg-surface-variant transition-colors flex items-center justify-center h-10 w-10 border border-outline-variant"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button
            onClick={() => alert("Zooming out...")}
            className="bg-surface text-on-surface p-2 rounded shadow-md hover:bg-surface-variant transition-colors flex items-center justify-center h-10 w-10 border border-outline-variant"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>

        {hospitalsLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-container/80 z-30">
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
              <p className="font-body-md text-body-md text-on-surface-variant">Loading hospitals...</p>
            </div>
          </div>
        )}

        {filteredHospitals.map((h) => (
          <div
            key={h.id}
            onClick={() => setSelectedHospital(h)}
            style={{ top: h.markerPos?.top || '50%', left: h.markerPos?.left || '50%' }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
          >
            <div className={`px-3 py-1 rounded-full shadow-lg font-label-bold text-label-bold mb-1 transition-all whitespace-nowrap bg-primary text-on-primary ${
              selectedHospital?.id === h.id ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100 scale-100'
            }`}>
              {h.tag || 'Hospital'}: {h.wait}
            </div>

            <div className={`rounded-full p-2 shadow-lg border-2 border-surface transition-transform ${
              selectedHospital?.id === h.id ? 'scale-125 bg-secondary text-on-secondary' : 'bg-primary text-on-primary animate-pulse'
            }`}>
              <span className="material-symbols-outlined text-[24px]">
                {h.type === 'Urgent Care' ? 'medical_services' : 'local_hospital'}
              </span>
            </div>
          </div>
        ))}

        {selectedHospital && (
          <div
            style={{
              top: `calc(${selectedHospital.markerPos?.top || '50%'} - 55px)`,
              left: selectedHospital.markerPos?.left || '50%'
            }}
            className="absolute transform -translate-x-1/2 -translate-y-full z-40 bg-surface rounded-xl shadow-xl border border-outline-variant w-72 p-4 animate-fade-in"
          >
            <button
              onClick={() => setSelectedHospital(null)}
              className="absolute top-2 right-2 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <h4 className="font-headline-md text-[16px] font-bold text-on-surface pr-6">
              {selectedHospital.name}
            </h4>
            <p className="text-sm text-on-surface-variant mb-3">
              {selectedHospital.distance} • {selectedHospital.wait}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => alert(`Navigating to ${selectedHospital.name}...`)}
                className="flex-1 h-10 bg-primary text-on-primary rounded-lg font-label-bold text-sm flex items-center justify-center gap-1 hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[16px]">directions</span> Go
              </button>
              <a
                href={`tel:${selectedHospital.phone}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Calling ${selectedHospital.name} at ${selectedHospital.phone}...`);
                }}
                className="flex-1 h-10 bg-surface-container-highest text-primary rounded-lg font-label-bold text-sm flex items-center justify-center gap-1 border border-outline-variant hover:bg-surface-variant"
              >
                <span className="material-symbols-outlined text-[16px]">call</span> Call
              </a>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-surface border-b border-r border-outline-variant rotate-45"></div>
          </div>
        )}
      </div>

      {/* Hospital List Sidebar */}
      <div className="w-full md:w-[400px] h-[450px] md:h-full bg-surface absolute bottom-0 md:relative z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:shadow-[-4px_0_20px_rgba(0,0,0,0.05)] rounded-t-xl md:rounded-none flex flex-col">
        <div className="w-full h-6 flex justify-center items-center md:hidden pt-2 cursor-pointer">
          <div className="w-12 h-1.5 bg-outline-variant rounded-full"></div>
        </div>

        <div className="p-4 md:p-6 border-b border-surface-variant flex-shrink-0">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md hidden md:block">
            Nearby Facilities
          </h2>

          <div className="relative mb-stack-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-10 pr-4 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-body-md shadow-sm"
              placeholder="Search hospitals, zip code..."
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All ERs', 'Urgent Care', 'Trauma Center', 'Pediatrics'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-label-bold text-label-bold border transition-colors ${
                  filterType === type
                    ? 'bg-primary-container text-on-primary-container border-primary-container'
                    : 'bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-stack-md flex flex-col gap-stack-md pb-24 md:pb-stack-md bg-surface-bright">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((h) => {
              const isBest = h.tag === 'Best Match';
              const isSelected = selectedHospital?.id === h.id;

              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHospital(h)}
                  className={`bg-surface rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col p-4 relative overflow-hidden border-2 ${
                    isSelected ? 'border-secondary' : isBest ? 'border-primary' : 'border-outline-variant'
                  }`}
                >
                  {isBest && (
                    <div className="absolute top-0 right-0 bg-primary text-on-primary px-3 py-1 rounded-bl-lg font-label-bold text-label-bold text-[12px]">
                      Best Match
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2 pt-2">
                    <div>
                      <h3 className="font-headline-md text-[18px] text-on-surface font-bold leading-tight pr-14">
                        {h.name}
                      </h3>
                      <p className="text-on-surface-variant text-sm flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {h.distance}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold flex items-center gap-1 justify-end ${
                        parseInt(h.wait) < 20 ? 'text-tertiary-container' : 'text-error'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        {h.wait}
                      </div>
                      <p className="text-xs text-tertiary font-semibold mt-1">
                        {h.status || 'Status: Open'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 mb-4">
                    {(h.details || []).map((det, idx) => (
                      <span
                        key={idx}
                        className="bg-surface-container-low text-on-surface-variant text-xs px-2 py-1 rounded-md border border-outline-variant"
                      >
                        {det}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="flex gap-3 mt-auto animate-fade-in">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Navigating to ${h.name}...`);
                        }}
                        className="flex-1 h-12 bg-primary text-on-primary rounded-lg font-label-bold text-label-bold flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">directions</span>
                        Navigate
                      </button>
                      <a
                        href={`tel:${h.phone}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Calling ${h.name} at ${h.phone}...`);
                        }}
                        className="w-12 h-12 bg-surface-container-highest text-primary border border-outline-variant rounded-lg flex items-center justify-center hover:bg-surface-variant transition-colors"
                      >
                        <span className="material-symbols-outlined">call</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-on-surface-variant">
              {hospitalsLoading ? 'Loading hospitals...' : 'No medical facilities match your search query or filter.'}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
