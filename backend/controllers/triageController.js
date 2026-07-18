import { TriageResult, ActivityLog } from '../models/EmergencyContact.js';

const CRITICAL_KEYWORDS = [
  'chest pain', 'stroke', 'heart attack', 'unconscious', 'not breathing',
  'severe bleeding', 'anaphylaxis', 'seizure', 'overdose', 'suicide',
  'choking', 'drowning', 'paralysis', 'slurred speech', 'facial drooping',
  'sudden numbness', 'difficulty breathing', 'cant breathe', 'cant breathe',
  'loss of consciousness', 'cardiac'
];

const URGENT_KEYWORDS = [
  'fracture', 'broken bone', 'deep cut', 'severe pain', 'head injury',
  'burn', 'high fever', 'persistent vomiting', 'blood in urine',
  'blood in stool', 'severe allergic', 'asthma attack', 'diabetic emergency',
  'fainting', 'severe abdominal'
];

const MODERATE_KEYWORDS = [
  'fever', 'vomit', 'vomiting', 'cough', 'sick', 'flu', 'cold',
  'headache', 'migraine', 'diarrhea', 'rash', 'infection', 'sprain',
  'earache', 'sore throat', 'stomach', 'nausea', 'dizziness', 'fatigue'
];

function classifyUrgency(symptomText, painLevel) {
  const text = symptomText.toLowerCase();

  for (const keyword of CRITICAL_KEYWORDS) {
    if (text.includes(keyword)) {
      return 'CRITICAL';
    }
  }

  if (painLevel >= 8) return 'URGENT';

  for (const keyword of URGENT_KEYWORDS) {
    if (text.includes(keyword)) {
      return 'URGENT';
    }
  }

  if (painLevel >= 5) return 'MODERATE';

  for (const keyword of MODERATE_KEYWORDS) {
    if (text.includes(keyword)) {
      return 'MODERATE';
    }
  }

  return 'NON-EMERGENCY';
}

function getRecommendations(urgency) {
  const recommendations = {
    CRITICAL: [
      'Call 911 or proceed immediately to the nearest Emergency Room.',
      'Do not drive yourself. Have someone drive you or call an ambulance.',
      'Unlock your front door so emergency services can enter.',
      'Keep emergency medical profile ready to present.'
    ],
    URGENT: [
      'Go to the nearest Urgent Care or Hospital.',
      'Bring your ID and Insurance Card.',
      'Do not eat or drink if you suspect surgery is needed.',
      'Have someone drive you if possible.'
    ],
    MODERATE: [
      'Visit an Urgent Care or schedule an appointment with your doctor.',
      'Stay hydrated and take fever reducers if appropriate.',
      'Monitor temperature hourly.'
    ],
    'NON-EMERGENCY': [
      'Rest at home and observe symptoms.',
      'Follow up with your general practitioner.',
      'If symptoms worsen, re-run triage.'
    ]
  };
  return recommendations[urgency];
}

export const analyzeSymptoms = async (req, res, next) => {
  try {
    const { symptoms, duration, painLevel, lat, lng } = req.body;

    if (!symptoms || symptoms.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Symptoms description is required' });
    }

    const urgency = classifyUrgency(symptoms, painLevel || 5);
    const recommendations = getRecommendations(urgency);

    const triageResult = await TriageResult.create({
      user: req.user._id,
      complaint: symptoms,
      onset: duration || 'Not specified',
      painLevel: painLevel || 5,
      urgency,
      recommendations,
      coordinates: lat && lng ? { lat, lng } : undefined
    });

    await ActivityLog.create({
      user: req.user._id,
      title: `Triage Completed - ${urgency}`,
      description: `Symptom assessment for: "${symptoms.slice(0, 50)}..."`,
      type: 'triage'
    });

    res.status(200).json({
      success: true,
      data: {
        id: triageResult._id,
        complaint: symptoms,
        onset: duration || 'Not specified',
        painLevel: painLevel || 5,
        urgency,
        recommendations,
        timestamp: triageResult.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTriageHistory = async (req, res, next) => {
  try {
    const results = await TriageResult.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const getTriageById = async (req, res, next) => {
  try {
    const result = await TriageResult.findOne({ _id: req.params.id, user: req.user._id });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Triage result not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
