export const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;

  switch (err.message) {
    case "UNAUTHORIZED":
      statusCode = 401;
      message = "User not authorized";
      break;

    case "FORBIDDEN":
      statusCode = 403;
      message = "Access forbidden";
      break;

    case "NOT_FOUND":
      statusCode = 404;
      message = "Resource not found";
      break;

    case "VALIDATION_ERROR":
      statusCode = 400;
      message = "Invalid input data";
      break;

    default:
      statusCode = 500;
      message = "Internal Server Error";
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};