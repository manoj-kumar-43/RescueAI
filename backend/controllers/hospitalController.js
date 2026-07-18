import Hospital from '../models/Hospital.js';

export const getHospitals = async (req, res, next) => {
  try {
    const { lat, lng, type, search, radius } = req.query;
    const query = {};

    if (type && type !== 'All ERs') {
      query.type = type;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (lat && lng) {
      const maxDistance = radius ? parseInt(radius) : 50000;
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: maxDistance
        }
      };
    }

    const hospitals = await Hospital.find(query).limit(20);

    const formatted = hospitals.map(h => ({
      id: h._id,
      name: h.name,
      type: h.type,
      distance: h.distance || 'Unknown',
      wait: `${h.waitTime} min wait`,
      isOpen: h.isOpen,
      status: h.isOpen ? 'Open' : 'Closed',
      details: h.capabilities,
      phone: h.phone,
      address: h.address,
      markerPos: h.location?.coordinates
        ? { lat: h.location.coordinates[1], lng: h.location.coordinates[0] }
        : null
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

export const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

export const createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

export const updateHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    next(error);
  }
};

export const deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.status(200).json({ success: true, message: 'Hospital deleted' });
  } catch (error) {
    next(error);
  }
};
