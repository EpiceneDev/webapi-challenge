function validateAction(req, res, next) {
  req.body
    ? req.body
      ? next()
      : res.status(400).json({ message: "missing required fields." })
    : res.status(500).json({ message: "missing action data" });
}

module.exports = validateAction;