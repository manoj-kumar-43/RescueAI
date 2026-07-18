import MedicalProfile from '../models/MedicalProfile.js';

export const getProfile = async (req, res, next) => {
  try {
    let profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await MedicalProfile.create({
        user: req.user._id,
        name: req.user.name
      });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const addAllergy = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.allergies.push(req.body);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const removeAllergy = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.allergies.splice(parseInt(req.params.index), 1);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const addMedication = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.medications.push(req.body);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const removeMedication = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.medications.splice(parseInt(req.params.index), 1);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const addCondition = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.conditions.push(req.body);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const removeCondition = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.conditions.splice(parseInt(req.params.index), 1);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const addEvent = async (req, res, next) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    profile.events.push(req.body);
    await profile.save();
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};
