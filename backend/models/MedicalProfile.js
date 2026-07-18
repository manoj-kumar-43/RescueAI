import mongoose from 'mongoose';

const MedicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  dob: {
    type: String
  },
  age: {
    type: String
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']
  },
  weight: {
    type: String
  },
  height: {
    type: String
  },
  emergencies: [{
    name: String,
    relationship: String,
    phone: String
  }],
  allergies: [{
    name: String,
    reaction: String
  }],
  conditions: [{
    name: String,
    details: String
  }],
  medications: [{
    name: String,
    dosage: String
  }],
  profilePhoto: {
    type: String,
    default: ''
  },
  events: [{
    title: String,
    date: String,
    details: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('MedicalProfile', MedicalProfileSchema);
