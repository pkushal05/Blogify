// Send a standardized successful JSON response with status code, message, and optional data
const sendResponse = (res, statusCode, message = "", data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data,
  });
};

// Send a standardized error JSON response with status code and error message
const sendError = (res, statusCode, message = "") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { sendError, sendResponse };
