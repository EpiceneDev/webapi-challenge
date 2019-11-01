function logger(req, res, next) {
    // console.log(`the Logger: [${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
    console.log(`the Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`);
    
    next();
  };

module.exports = logger;