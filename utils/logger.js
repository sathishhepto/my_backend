const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs'); // Set log directory

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: `${logDirectory}/app-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '1d', 
      zippedArchive: false,
    }),
  ],
});

module.exports = logger;

