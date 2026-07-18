import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function MedicalHistory() {
  const { medicalProfile, setMedicalProfile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  // Local Form state
  const [bloodType, setBloodType] = useState(medicalProfile.bloodType);
  const [weight, setWeight] = useState(medicalProfile.weight);
  const [height, setHeight] = useState(medicalProfile.height);
  const [newAllergyName, setNewAllergyName] = useState('');
  const [newAllergyReaction, setNewAllergyReaction] = useState('');
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');

  const handleSave = () => {
    setMedicalProfile({
      ...medicalProfile,
      bloodType,
      weight,
      height
    });
    setIsEditing(false);
  };

  const addAllergy = (e) => {
    e.preventDefault();
    if (!newAllergyName) return;
    setMedicalProfile({
      ...medicalProfile,
      allergies: [...medicalProfile.allergies, { name: newAllergyName, reaction: newAllergyReaction || 'Unknown reaction' }]
    });
    setNewAllergyName('');
    setNewAllergyReaction('');
  };

  const removeAllergy = (index) => {
    const updated = medicalProfile.allergies.filter((_, i) => i !== index);
    setMedicalProfile({
      ...medicalProfile,
      allergies: updated
    });
  };

  const addMedication = (e) => {
    e.preventDefault();
    if (!newMedName) return;
    setMedicalProfile({
      ...medicalProfile,
      medications: [...medicalProfile.medications, { name: newMedName, dosage: newMedDosage || 'As needed' }]
    });
    setNewMedName('');
    setNewMedDosage('');
  };

  const removeMedication = (index) => {
    const updated = medicalProfile.medications.filter((_, i) => i !== index);
    setMedicalProfile({
      ...medicalProfile,
      medications: updated
    });
  };

  return (
    <div className="flex-1 w-full pt-4 pb-12 px-container-margin-mobile md:px-container-margin-desktop overflow-y-auto">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-stack-md">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background mb-unit font-black">
            Medical History
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            This profile is used by RescueAI to provide life-saving context during emergency triage. Ensure it is accurate and up-to-date.
          </p>
        </div>
        
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg font-action-xl text-action-xl flex items-center gap-2 shadow-sm hover:bg-primary-container transition-colors min-h-[56px] whitespace-nowrap"
        >
          <span className="material-symbols-outlined">
            {isEditing ? 'save' : 'edit'}
          </span>
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Data Privacy Banner */}
      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-md mb-stack-lg flex items-start gap-4">
        <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>
          lock
        </span>
        <div>
          <h3 className="font-label-bold text-label-bold text-on-surface mb-1 font-bold">
            Secure Data Storage
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Your medical history is encrypted and stored locally. It is only accessed by RescueAI during an active emergency to assist first responders.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-md">
        
        {/* Personal Profile ID Card (Left Column) */}
        <section className="md:col-span-4 flex flex-col gap-stack-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-bl-full opacity-20 -z-10"></div>
            
            <div className="flex items-center gap-4 mb-stack-md">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-surface">
                <img
                  className="w-full h-full object-cover"
                  alt="Sarah Jenkins profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCfYNhFqt3IE_sXgaByHG2D4vdTsoXmGXkf5B7lPDIKe-DTvQQdR-O2wGw4wXtJ2UCi5bBtRoflNLxX5hBLYk2d4Y72QPvqnFyZ6DvhYZCKJbgK75nTxWUMlOAmSLJUGnpPbvnk41ZyUWJ5Xok4xtRQp8aHltoISFYhOx8xrPFTGlOfSwnJAKjAxR_42swe_PcEvzU-gmUVk2Vt_MsXUMstT60VdzhmXgQ-e0HZm9vlfQB0zWR_JPN_kyBu54lDe4wj60L5TRSu-C2"
                />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {medicalProfile.name}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  DOB: {medicalProfile.dob} ({medicalProfile.age})
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-unit mb-stack-md">
              <div className="bg-surface-container p-3 rounded-lg flex flex-col justify-center">
                <span className="font-label-bold text-label-bold text-on-surface-variant text-xs uppercase tracking-wider mb-1">
                  Blood Type
                </span>
                {isEditing ? (
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="p-1 border border-outline rounded bg-surface font-bold text-secondary"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <span className="font-headline-md text-headline-md text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bloodtype
                    </span>
                    {medicalProfile.bloodType}
                  </span>
                )}
              </div>
              
              <div className="bg-surface-container p-3 rounded-lg flex flex-col justify-center">
                <span className="font-label-bold text-label-bold text-on-surface-variant text-xs uppercase tracking-wider mb-1">
                  Weight / Height
                </span>
                {isEditing ? (
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="p-1 text-xs border border-outline rounded bg-surface w-full"
                      placeholder="e.g. 65kg"
                    />
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="p-1 text-xs border border-outline rounded bg-surface w-full"
                      placeholder="e.g. 168cm"
                    />
                  </div>
                ) : (
                  <span className="font-body-lg text-body-lg text-on-surface font-bold">
                    {medicalProfile.weight} / {medicalProfile.height}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-outline-variant pt-stack-sm mt-stack-sm">
              <h4 className="font-label-bold text-label-bold text-on-surface-variant mb-3 flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-sm">contact_phone</span>
                Primary Contacts
              </h4>
              <div className="space-y-3">
                {medicalProfile.emergencies.map((contact, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-surface p-3 rounded-lg border border-outline-variant">
                    <div>
                      <p className="font-label-bold text-label-bold text-on-surface font-bold">{contact.name}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">{contact.relationship}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Calling ${contact.name} at ${contact.phone}...`)}
                      className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        call
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Medical Records (Right Column) */}
        <section className="md:col-span-8 flex flex-col gap-stack-md">
          {/* Allergies Card (Critical High Visibility) */}
          <div className="bg-error-container border border-secondary-fixed-dim rounded-xl p-stack-md shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary opacity-10 rounded-bl-full -z-10"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-md text-headline-md text-on-error-container flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  warning
                </span>
                Critical Allergies
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {medicalProfile.allergies.map((allergy, index) => (
                <div key={index} className="bg-surface-container-lowest border-l-4 border-secondary px-4 py-3 rounded-r-lg shadow-sm flex items-center gap-3 relative pr-8">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    medication
                  </span>
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface font-bold">{allergy.name}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">{allergy.reaction}</p>
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => removeAllergy(index)}
                      className="absolute top-1 right-1 text-outline hover:text-secondary rounded-full p-0.5"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <form onSubmit={addAllergy} className="mt-4 flex flex-col sm:flex-row gap-2 border-t border-outline-variant/30 pt-3">
                <input
                  type="text"
                  placeholder="Allergen Name (e.g. Peanuts)"
                  value={newAllergyName}
                  onChange={(e) => setNewAllergyName(e.target.value)}
                  className="flex-1 p-2 border border-outline rounded text-sm bg-surface"
                />
                <input
                  type="text"
                  placeholder="Reaction (e.g. Swelling)"
                  value={newAllergyReaction}
                  onChange={(e) => setNewAllergyReaction(e.target.value)}
                  className="flex-1 p-2 border border-outline rounded text-sm bg-surface"
                />
                <button
                  type="submit"
                  className="bg-secondary text-on-secondary px-4 py-2 rounded text-sm font-bold hover:bg-secondary-container"
                >
                  Add Allergy
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md">
            {/* Chronic Conditions */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-2">
                <h3 className="font-body-lg text-body-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    monitor_heart
                  </span>
                  Chronic Conditions
                </h3>
              </div>
              <ul className="space-y-3">
                {medicalProfile.conditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-container shrink-0"></div>
                    <div>
                      <p className="font-label-bold text-label-bold text-on-surface font-bold">{cond.name}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">{cond.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Medications */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant pb-2">
                <h3 className="font-body-lg text-body-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    prescriptions
                  </span>
                  Medications
                </h3>
              </div>
              <ul className="space-y-3">
                {medicalProfile.medications.map((med, index) => (
                  <li key={index} className="bg-surface p-3 rounded-lg border border-outline-variant flex justify-between items-center relative pr-8">
                    <div>
                      <p className="font-label-bold text-label-bold text-on-surface font-bold">{med.name}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">{med.dosage}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline">pill</span>
                    {isEditing && (
                      <button 
                        onClick={() => removeMedication(index)}
                        className="absolute top-1 right-1 text-outline hover:text-secondary rounded-full p-0.5"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {isEditing && (
                <form onSubmit={addMedication} className="mt-3 flex flex-col gap-2 border-t border-outline-variant/30 pt-3">
                  <input
                    type="text"
                    placeholder="Meds Name (e.g. Aspirin)"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    className="p-2 border border-outline rounded text-sm bg-surface"
                  />
                  <input
                    type="text"
                    placeholder="Dosage (e.g. 81mg, Daily)"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    className="p-2 border border-outline rounded text-sm bg-surface"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary py-2 rounded text-sm font-bold hover:bg-primary-container"
                  >
                    Add Medication
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Recent Events Timeline */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
            <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Medical Events
            </h3>
            <div className="relative pl-6 border-l-2 border-surface-variant space-y-6">
              {medicalProfile.events.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-surface-container-lowest border-2 ${
                    idx === 0 ? 'border-primary' : 'border-outline-variant'
                  }`}></div>
                  <p className="font-label-bold text-label-bold text-on-surface font-bold">{evt.title}</p>
                  <p className="font-body-md text-body-md text-primary text-sm mb-1 font-semibold">{evt.date}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{evt.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
