function logger(req, res, next) {
    console.log(`the Logger: [${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
  
    next();
  };

module.exports = logger;