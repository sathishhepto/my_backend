// helpers/responseHelper.js
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  };
  
  const handleDbError = (error) => {
    let statusCode = 500;
    let message = "A database error occurred.";

    if (error.name === "SequelizeUniqueConstraintError") {
        statusCode = 400;
        message = "Duplicate entry: The value already exists.";
    } else if (error.name === "SequelizeValidationError") {
        statusCode = 400;
        message = error.errors.map(err => err.message).join(", ");
    } else if (error.name === "SequelizeDatabaseError") {
        statusCode = 500;
        message = "Database error: " + error.message;
    } else if (error.code === "ER_DUP_ENTRY") { 
        statusCode = 400;
        message = "Duplicate entry: " + error.sqlMessage;
    }

    return { statusCode, message };
};


  const sendSuccessResponse = (res, data, message = "Success") => {
    res.status(200).json({ message, data });
  };
  
  module.exports = { sendErrorResponse, sendSuccessResponse };
  