const express = require("express");
const router = express.Router();
const validateActionId = require("./validateActionId.js");
const validateAction = require("./validateAction.js");
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

router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the Action."
      });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  Actions.remove(id)
    .then(countDeleted => {
      if (countDeleted) {
        res
          .status(200)
          .json({ message: `Action with ${id} has been deleted`, id: id });
      } else {
        res.status(404).json({ errorMessage: "No action found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "internal Server Error" });
    });
});

router.put("/:id", validateAction, validateActionId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Actions.update(id, changes)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Updating Action" });
    });
});

module.exports = router;