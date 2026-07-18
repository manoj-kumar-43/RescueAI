import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['Trauma Center', 'Urgent Care', 'Pediatrics', 'General'],
    default: 'General'
  },
  address: String,
  phone: String,
  distance: String,
  waitTime: {
    type: Number,
    default: 15
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: 'Open'
  },
  capabilities: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
  }
}, {
  timestamps: true
});

HospitalSchema.index({ location: '2dsphere' });

export default mongoose.model('Hospital', HospitalSchema);
