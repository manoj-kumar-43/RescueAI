export const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  if (err.name === 'CastError') {
    error.message = 'Resource not found';
    return res.status(404).json({ success: false, message: error.message });
  }

  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    return res.status(400).json({ success: false, message: error.message });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    error.message = messages.join(', ');
    return res.status(400).json({ success: false, message: error.message });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
};
