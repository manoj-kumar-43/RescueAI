import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation / Router State
  const [activePage, setActivePage] = useState('landing');
  
  // Triage Inputs
  const [symptomText, setSymptomText] = useState('');
  const [triageDuration, setTriageDuration] = useState('Select duration');
  const [triagePain, setTriagePain] = useState(5);
  
  // Triage Results State
  const [triageResult, setTriageResult] = useState(null);
  
  // System Emergency Banner Trigger
  const [systemAlertActive, setSystemAlertActive] = useState(false);

  // Voice Simulation State
  const [voiceActive, setVoiceActive] = useState(false);

  // Emergency Contacts
  const [contactsList, setContactsList] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      relationship: 'Sister',
      phone: '+1 (555) 123-4567',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Dr. Robert Chen',
      relationship: 'Primary Physician',
      phone: '+1 (555) 987-6543',
      status: 'Active'
    }
  ]);

  // Auto-Alert Rules Configuration
  const [alertRules, setAlertRules] = useState({
    critical: true,
    urgent: true,
    moderate: false
  });

  // Medical History Profile
  const [medicalProfile, setMedicalProfile] = useState({
    name: 'Sarah Jenkins',
    dob: 'Oct 12, 1980',
    age: '43y',
    bloodType: 'O-',
    weight: '65kg',
    height: '168cm',
    emergencies: [
      { name: 'Michael Jenkins', relationship: 'Husband', phone: '+1 (555) 111-2222' }
    ],
    allergies: [
      { name: 'Penicillin', reaction: 'Anaphylaxis' },
      { name: 'Latex', reaction: 'Severe Rash' }
    ],
    conditions: [
      { name: 'Type 2 Diabetes', details: 'Diagnosed 2018. Well managed.' },
      { name: 'Hypertension', details: 'Diagnosed 2020.' }
    ],
    medications: [
      { name: 'Metformin', dosage: '500mg, Twice Daily' },
      { name: 'Lisinopril', dosage: '10mg, Once Daily' }
    ],
    events: [
      { title: 'Appendectomy', date: 'March 15, 2023', details: 'Laparoscopic procedure at Mercy General. No complications.' },
      { title: 'ER Visit - Minor Laceration', date: 'November 2, 2022', details: 'Sutures on left forearm.' }
    ]
  });

  // Safety Status and Logs
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      title: 'Triage Completed - Minor Injury',
      description: 'Sprained ankle protocol followed. No hospital visit required.',
      time: 'Today, 10:42 AM',
      type: 'triage'
    },
    {
      id: 2,
      title: 'Hospital Search',
      description: 'Searched for facilities with shortest wait times for urgent care.',
      time: 'Yesterday, 4:15 PM',
      type: 'hospital'
    },
    {
      id: 3,
      title: 'Profile Updated',
      description: 'Added new emergency contact: Jane Doe.',
      time: 'Oct 24, 2023',
      type: 'profile'
    }
  ]);

  // Run alert rules check whenever symptomText changes
  useEffect(() => {
    const val = symptomText.toLowerCase();
    if (val.includes('chest pain') || val.includes('stroke') || val.includes('heart') || val.includes('breathing') || val.includes('unconscious')) {
      setSystemAlertActive(true);
    } else {
      setSystemAlertActive(false);
    }
  }, [symptomText]);

  // Helper function to calculate urgency and set triage result
  const analyzeSymptoms = () => {
    let urgency = 'MODERATE';
    let recommendations = [
      'Monitor your symptoms closely.',
      'Rest and hydrate.',
      'Consult your primary care physician if symptoms persist.'
    ];

    const val = symptomText.toLowerCase();
    
    if (val.includes('chest pain') || val.includes('stroke') || val.includes('breathing') || val.includes('unconscious')) {
      urgency = 'CRITICAL';
      recommendations = [
        'Call 911 or proceed immediately to the nearest Emergency Room.',
        'Do not drive yourself. Have someone drive you or call an ambulance.',
        'Unlock your front door so emergency services can enter.',
        'Keep emergency medical profile ready to present.'
      ];
    } else if (val.includes('pain') && triagePain > 6) {
      urgency = 'URGENT';
      recommendations = [
        'Go to the nearest Urgent Care or Hospital.',
        'Bring your ID and Insurance Card.',
        'Do not eat or drink if you suspect surgery is needed.',
        'Have someone drive you if possible.'
      ];
    } else if (val.includes('fever') || val.includes('vomit') || val.includes('cough') || val.includes('sick')) {
      urgency = 'MODERATE';
      recommendations = [
        'Visit an Urgent Care or schedule an appointment with your doctor.',
        'Stay hydrated and take fever reducers if appropriate.',
        'Monitor temperature hourly.'
      ];
    } else {
      urgency = 'NON-EMERGENCY';
      recommendations = [
        'Rest at home and observe symptoms.',
        'Follow up with your general practitioner.',
        'If symptoms worsen, re-run triage.'
      ];
    }

    setTriageResult({
      complaint: symptomText || 'General discomfort',
      onset: triageDuration,
      painLevel: triagePain,
      urgency,
      recommendations,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Add to activity log
    const logItem = {
      id: Date.now(),
      title: `Triage Completed - ${urgency}`,
      description: `Symptom assessment for: "${symptomText.slice(0, 30)}..."`,
      time: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'triage'
    };
    setRecentActivity(prev => [logItem, ...prev]);

    setActivePage('urgency-results');
  };

  const startNewTriage = () => {
    setSymptomText('');
    setTriagePain(5);
    setTriageDuration('Select duration');
    setTriageResult(null);
    setActivePage('triage');
  };

  const notifyContacts = () => {
    // Add to activity log
    const logItem = {
      id: Date.now(),
      title: 'Emergency Broadcast Sent',
      description: `Broadcasted coordinates and status to ${contactsList.length} contacts.`,
      time: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      type: 'broadcast'
    };
    setRecentActivity(prev => [logItem, ...prev]);
    alert(`Alert broadcasted successfully to your emergency contacts!`);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        symptomText,
        setSymptomText,
        triageDuration,
        setTriageDuration,
        triagePain,
        setTriagePain,
        triageResult,
        setTriageResult,
        systemAlertActive,
        setSystemAlertActive,
        voiceActive,
        setVoiceActive,
        contactsList,
        setContactsList,
        alertRules,
        setAlertRules,
        medicalProfile,
        setMedicalProfile,
        recentActivity,
        setRecentActivity,
        analyzeSymptoms,
        startNewTriage,
        notifyContacts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
