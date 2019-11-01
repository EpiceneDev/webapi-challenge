const Action = require("../actions/actionModel.js");
function validateActionId(req, res, next) {
 const { id } = req.params;
 Users.getById(id).then(user => {
   if (user) {
     req.user = user;
     next();
   } else {
     res.status(400).json({ message: "Invalid action id" });
   }
 });
}
module.exports = validateActionId;