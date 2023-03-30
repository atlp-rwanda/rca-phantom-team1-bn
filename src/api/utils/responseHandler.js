export const successResponse = (res, message, statusCode, data = {}) => {
  res.status(statusCode).json({
    success: message,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const catchAsyncError = (fn) => async (req, res, next) => {
  const response = await fn(req, res, next).catch(next);
  return response;
};
