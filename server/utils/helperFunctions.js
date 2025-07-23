const sendResponse = (res, statusCode, message = "", data = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        ...data
    });
};

const sendError = (res, statusCode, message = "") => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};

export { sendError, sendResponse };