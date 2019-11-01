const Projects = require("../projects/projectModel.js");
function validateProjectId(req, res, next) {
 const { id } = req.params;
 Projects.get(id).then(project => {
   if (project) {
     req.project = project;
     next();
   } else {
     res.status(400).json({ message: "Invalid project id" });
   }
 });
}
module.exports = validateProjectId;