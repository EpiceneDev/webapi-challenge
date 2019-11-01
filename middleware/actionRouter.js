const express = require("express");
const validateActionId = require("./validateActionId.js");
const router = express.Router();
const Actions = require("../actions/actionModel.js");

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving actions." });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  Actions.get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error to retriving user." });
    });
});

module.exports = router;