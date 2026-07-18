import { ActivityLog } from '../models/EmergencyContact.js';

export const getActivities = async (req, res, next) => {
  try {
    const { type, limit } = req.query;
    const query = { user: req.user._id };
    if (type) query.type = type;

    const activities = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 20);

    const formatted = activities.map(a => ({
      id: a._id,
      title: a.title,
      description: a.description,
      type: a.type,
      time: formatTime(a.createdAt)
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

export const addActivity = async (req, res, next) => {
  try {
    const activity = await ActivityLog.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json({ success: true, data: activity });
  } catch (error) {
    next(error);
  }
};

function formatTime(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
