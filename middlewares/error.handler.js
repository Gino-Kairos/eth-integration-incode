const Sentry = require("@sentry/node");
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json({ success: false, ...output.payload });
  }
  next(err);
}

function middleHandler(err, req, res, next) {
  Sentry.captureException(err);
  next(err);
}

module.exports = { errorHandler, boomErrorHandler, middleHandler };
