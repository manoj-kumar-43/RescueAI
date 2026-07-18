import { EmergencyContact, ActivityLog, AlertRules } from '../models/EmergencyContact.js';
import { sendEmergencyAlert } from '../utils/smsNotifier.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await EmergencyContact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const { name, relationship, phone, email } = req.body;
    const contact = await EmergencyContact.create({
      user: req.user._id,
      name,
      relationship,
      phone,
      email
    });

    await ActivityLog.create({
      user: req.user._id,
      title: 'Contact Added',
      description: `${name} added as ${relationship || 'Contact'}`,
      type: 'profile'
    });

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const toggleContactStatus = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    contact.status = contact.status === 'Active' ? 'Paused' : 'Active';
    await contact.save();
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

export const broadcastAlert = async (req, res, next) => {
  try {
    const { triageResultId, lat, lng } = req.body;

    const activeContacts = await EmergencyContact.find({
      user: req.user._id,
      status: 'Active'
    });

    if (activeContacts.length === 0) {
      return res.status(400).json({ success: false, message: 'No active contacts to notify' });
    }

    const message = `EMERGENCY ALERT from RescueAI: ${req.user.name} has triggered an emergency broadcast. ` +
      (lat && lng ? `Location: https://maps.google.com/?q=${lat},${lng}. ` : '') +
      (triageResultId ? 'Triage details are available in the RescueAI app.' : 'Please check on them immediately.');

    const results = await sendEmergencyAlert(activeContacts, message);

    await ActivityLog.create({
      user: req.user._id,
      title: 'Emergency Broadcast Sent',
      description: `Broadcasted coordinates and status to ${activeContacts.length} contacts.`,
      type: 'broadcast'
    });

    res.status(200).json({
      success: true,
      message: `Alert broadcasted to ${activeContacts.length} contacts`,
      results
    });
  } catch (error) {
    next(error);
  }
};

export const getAlertRules = async (req, res, next) => {
  try {
    let rules = await AlertRules.findOne({ user: req.user._id });
    if (!rules) {
      rules = await AlertRules.create({ user: req.user._id });
    }
    res.status(200).json({ success: true, data: rules });
  } catch (error) {
    next(error);
  }
};

export const updateAlertRules = async (req, res, next) => {
  try {
    const rules = await AlertRules.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!rules) {
      return res.status(404).json({ success: false, message: 'Alert rules not found' });
    }
    res.status(200).json({ success: true, data: rules });
  } catch (error) {
    next(error);
  }
};
