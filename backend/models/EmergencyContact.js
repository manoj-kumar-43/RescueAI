import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  relationship: {
    type: String,
    default: 'Contact'
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Paused'],
    default: 'Active'
  }
}, {
  timestamps: true
});

const ActivityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['triage', 'hospital', 'profile', 'broadcast'],
    default: 'triage'
  }
}, {
  timestamps: true
});

const AlertRulesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  critical: {
    type: Boolean,
    default: true
  },
  urgent: {
    type: Boolean,
    default: true
  },
  moderate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const TriageResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  complaint: String,
  onset: String,
  painLevel: Number,
  urgency: {
    type: String,
    enum: ['CRITICAL', 'URGENT', 'MODERATE', 'NON-EMERGENCY']
  },
  recommendations: [String],
  coordinates: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true
});

export const EmergencyContact = mongoose.model('EmergencyContact', EmergencyContactSchema);
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
export const AlertRules = mongoose.model('AlertRules', AlertRulesSchema);
export const TriageResult = mongoose.model('TriageResult', TriageResultSchema);
