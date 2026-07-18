import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI, triageAPI, hospitalAPI, contactAPI, profileAPI, activityAPI, setToken, clearToken, getToken } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Auth State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  // Voice State (Web Speech API)
  const [voiceActive, setVoiceActive] = useState(false);

  // Error/Notification State
  const [notification, setNotification] = useState(null);

  // Loading states
  const [triageLoading, setTriageLoading] = useState(false);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);

  // Emergency Contacts
  const [contactsList, setContactsList] = useState([]);

  // Auto-Alert Rules Configuration
  const [alertRules, setAlertRules] = useState({
    critical: true,
    urgent: true,
    moderate: false
  });

  // Medical History Profile
  const [medicalProfile, setMedicalProfile] = useState({
    name: '',
    dob: '',
    age: '',
    bloodType: '',
    weight: '',
    height: '',
    emergencies: [],
    allergies: [],
    conditions: [],
    medications: [],
    events: []
  });

  // Safety Status and Logs
  const [recentActivity, setRecentActivity] = useState([]);

  // Hospitals list (fetched from backend)
  const [hospitalsList, setHospitalsList] = useState([]);

  // Show notification helper
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // Check auth on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      loadUser();
    } else {
      setAuthLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await authAPI.getMe();
      setUser(res.user);
      setIsAuthenticated(true);
      await loadUserData();
    } catch {
      clearToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const [contactsRes, profileRes, activityRes] = await Promise.allSettled([
        contactAPI.getAll(),
        profileAPI.get(),
        activityAPI.getAll()
      ]);

      if (contactsRes.status === 'fulfilled' && contactsRes.value.data) {
        setContactsList(contactsRes.value.data.map(c => ({
          id: c._id,
          name: c.name,
          relationship: c.relationship,
          phone: c.phone,
          status: c.status
        })));
      }

      if (profileRes.status === 'fulfilled' && profileRes.value.data) {
        const p = profileRes.value.data;
        setMedicalProfile({
          name: p.name || '',
          dob: p.dob || '',
          age: p.age || '',
          bloodType: p.bloodType || '',
          weight: p.weight || '',
          height: p.height || '',
          emergencies: p.emergencies || [],
          allergies: p.allergies || [],
          conditions: p.conditions || [],
          medications: p.medications || [],
          events: p.events || []
        });
      }

      if (activityRes.status === 'fulfilled' && activityRes.value.data) {
        setRecentActivity(activityRes.value.data);
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  };

  // Auth: Register
  const register = async (name, email, password) => {
    try {
      const res = await authAPI.register({ name, email, password });
      setToken(res.token);
      setUser(res.user);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      await loadUserData();
      showNotification('Account created successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(err.message || 'Registration failed', 'error');
      return false;
    }
  };

  // Auth: Login
  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      setToken(res.token);
      setUser(res.user);
      setIsAuthenticated(true);
      setShowAuthModal(false);
      await loadUserData();
      showNotification('Logged in successfully!', 'success');
      return true;
    } catch (err) {
      showNotification(err.message || 'Login failed', 'error');
      return false;
    }
  };

  // Auth: Logout
  const logout = () => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
    setContactsList([]);
    setMedicalProfile({
      name: '', dob: '', age: '', bloodType: '', weight: '', height: '',
      emergencies: [], allergies: [], conditions: [], medications: [], events: []
    });
    setRecentActivity([]);
    setTriageResult(null);
    setActivePage('landing');
    showNotification('Logged out successfully', 'info');
  };

  // Run alert rules check whenever symptomText changes
  useEffect(() => {
    const val = symptomText.toLowerCase();
    if (val.includes('chest pain') || val.includes('stroke') || val.includes('heart') || val.includes('breathing') || val.includes('unconscious')) {
      setSystemAlertActive(true);
    } else {
      setSystemAlertActive(false);
    }
  }, [symptomText]);

  // Helper function to calculate urgency and set triage result (connected to backend)
  const analyzeSymptoms = async () => {
    if (isAuthenticated) {
      setTriageLoading(true);
      try {
        const payload = {
          symptoms: symptomText,
          duration: triageDuration !== 'Select duration' ? triageDuration : undefined,
          painLevel: triagePain
        };
        const res = await triageAPI.analyze(payload);
        setTriageResult(res.data);

        const logItem = {
          id: Date.now(),
          title: `Triage Completed - ${res.data.urgency}`,
          description: `Symptom assessment for: "${symptomText.slice(0, 30)}..."`,
          time: 'Just now',
          type: 'triage'
        };
        setRecentActivity(prev => [logItem, ...prev]);

        setActivePage('urgency-results');
      } catch (err) {
        showNotification(err.message || 'Triage analysis failed. Using local analysis.', 'error');
        localTriageAnalysis();
      } finally {
        setTriageLoading(false);
      }
    } else {
      localTriageAnalysis();
    }
  };

  // Fallback local triage analysis when not authenticated or backend fails
  const localTriageAnalysis = () => {
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

    const logItem = {
      id: Date.now(),
      title: `Triage Completed - ${urgency}`,
      description: `Symptom assessment for: "${symptomText.slice(0, 30)}..."`,
      time: 'Just now',
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

  // Notify contacts (connected to backend)
  const notifyContacts = async () => {
    if (isAuthenticated) {
      try {
        await contactAPI.broadcast({});
        const logItem = {
          id: Date.now(),
          title: 'Emergency Broadcast Sent',
          description: `Broadcasted coordinates and status to ${contactsList.length} contacts.`,
          time: 'Just now',
          type: 'broadcast'
        };
        setRecentActivity(prev => [logItem, ...prev]);
        showNotification(`Alert broadcasted successfully to ${contactsList.length} contacts!`, 'success');
      } catch (err) {
        showNotification(err.message || 'Failed to broadcast alert', 'error');
      }
    } else {
      const logItem = {
        id: Date.now(),
        title: 'Emergency Broadcast Sent',
        description: `Broadcasted coordinates and status to ${contactsList.length} contacts.`,
        time: 'Just now',
        type: 'broadcast'
      };
      setRecentActivity(prev => [logItem, ...prev]);
      showNotification(`Alert broadcasted to your emergency contacts! (Login to enable real notifications)`, 'info');
    }
  };

  // Contact operations (connected to backend)
  const addContact = async (contactData) => {
    if (isAuthenticated) {
      try {
        const res = await contactAPI.add(contactData);
        const newContact = {
          id: res.data._id,
          name: res.data.name,
          relationship: res.data.relationship,
          phone: res.data.phone,
          status: res.data.status
        };
        setContactsList(prev => [...prev, newContact]);
        const logItem = {
          id: Date.now(),
          title: 'Contact Added',
          description: `${contactData.name} added as ${contactData.relationship || 'Contact'}`,
          time: 'Just now',
          type: 'profile'
        };
        setRecentActivity(prev => [logItem, ...prev]);
        showNotification(`${contactData.name} added to contacts`, 'success');
      } catch (err) {
        showNotification(err.message || 'Failed to add contact', 'error');
      }
    } else {
      const newContact = {
        id: Date.now(),
        name: contactData.name,
        relationship: contactData.relationship || 'Contact',
        phone: contactData.phone,
        status: 'Active'
      };
      setContactsList(prev => [...prev, newContact]);
      showNotification(`${contactData.name} added locally (Login to sync)`, 'info');
    }
  };

  const deleteContact = async (id) => {
    if (isAuthenticated) {
      try {
        await contactAPI.delete(id);
        setContactsList(prev => prev.filter(c => c.id !== id));
        showNotification('Contact removed', 'success');
      } catch (err) {
        showNotification(err.message || 'Failed to delete contact', 'error');
      }
    } else {
      setContactsList(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleContactStatus = async (id) => {
    if (isAuthenticated) {
      try {
        await contactAPI.toggleStatus(id);
        setContactsList(prev => prev.map(c => {
          if (c.id === id) {
            return { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' };
          }
          return c;
        }));
      } catch (err) {
        showNotification(err.message || 'Failed to toggle contact status', 'error');
      }
    } else {
      setContactsList(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' };
        }
        return c;
      }));
    }
  };

  // Profile operations (connected to backend)
  const updateMedicalProfile = async (updates) => {
    setMedicalProfile(prev => ({ ...prev, ...updates }));
    if (isAuthenticated) {
      try {
        await profileAPI.update(updates);
      } catch (err) {
        showNotification(err.message || 'Failed to update profile on server', 'error');
      }
    }
  };

  // Fetch hospitals from backend
  const fetchHospitals = async (params = {}) => {
    setHospitalsLoading(true);
    try {
      const res = await hospitalAPI.getAll(params);
      setHospitalsList(res.data);
    } catch (err) {
      showNotification(err.message || 'Failed to fetch hospitals from server', 'error');
      // Use fallback data
      setHospitalsList([
        {
          id: 'mercy',
          name: 'Mercy General Hospital',
          distance: '2.4 miles away',
          wait: '15 min wait',
          isOpen: true,
          tag: 'Best Match',
          type: 'Trauma Center',
          details: ['Level 1 Trauma', 'Stroke Center'],
          phone: '+1 (555) 777-8888',
          markerPos: { top: '35%', left: '52%' }
        },
        {
          id: 'stjude',
          name: 'St. Jude Medical Center',
          distance: '3.8 miles away',
          wait: '45 min wait',
          isOpen: true,
          status: 'Limited Capacity',
          type: 'Pediatrics',
          details: ['Pediatrics ER'],
          phone: '+1 (555) 444-5555',
          markerPos: { top: '50%', left: '33%' }
        },
        {
          id: 'citymd',
          name: 'CityMD Urgent Care',
          distance: '1.2 miles away',
          wait: '5 min wait',
          isOpen: true,
          type: 'Urgent Care',
          details: ['X-Ray on site', 'Open Late'],
          phone: '+1 (555) 222-3333',
          markerPos: { top: '65%', left: '60%' }
        }
      ]);
    } finally {
      setHospitalsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        isAuthenticated,
        authLoading,
        showAuthModal,
        setShowAuthModal,
        register,
        login,
        logout,

        // Navigation
        activePage,
        setActivePage,

        // Triage
        symptomText,
        setSymptomText,
        triageDuration,
        setTriageDuration,
        triagePain,
        setTriagePain,
        triageResult,
        setTriageResult,
        triageLoading,
        analyzeSymptoms,
        startNewTriage,

        // Voice
        voiceActive,
        setVoiceActive,

        // System
        systemAlertActive,
        setSystemAlertActive,

        // Contacts
        contactsList,
        setContactsList,
        addContact,
        deleteContact,
        toggleContactStatus,
        alertRules,
        setAlertRules,

        // Profile
        medicalProfile,
        setMedicalProfile,
        updateMedicalProfile,

        // Activity
        recentActivity,
        setRecentActivity,

        // Hospitals
        hospitalsList,
        hospitalsLoading,
        fetchHospitals,

        // Actions
        notifyContacts,

        // Notification
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
