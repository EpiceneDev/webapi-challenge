function validateProject(req, res, next) {
    req.body
      ? req.body
        ? next()
        : res.status(400).json({ message: "missing required fields." })
      : res.status(500).json({ message: "missing project data" });
  }
  
  module.exports = validateProject;
  