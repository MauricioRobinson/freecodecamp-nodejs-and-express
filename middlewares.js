function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

function timeMiddleware(req, res, next) {
  req.time = new Date().toString();
  next();
}

module.exports = { loggerMiddleware, timeMiddleware };
