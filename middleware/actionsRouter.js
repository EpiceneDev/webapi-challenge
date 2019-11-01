const express = require("express");
const router = express.Router();

const Actions = require('../actions/actionModel.js');

router.get("/", (req, res) => {
 Actions.get()
   .then(posts => {
     res.status(200).json(posts);
   })
   .catch(err => {
     res.status(500).json({ message: "Error retrieving users." });
   });
});
// router.get("/:id", validatePostId, (req, res) => {
//  if (req.post) {
//    Posts.getById(req.post)
//      .then(posts => {
//        res.status(200).json(posts);
//      })
//      .catch(err => {
//        res.status(500).json({ message: "Error to retriving user." });
//      });
//  }
// });
// router.delete("/:id", validatePostId, (req, res) => {
//  if (req.post) {
//    Posts.remove(req.post)
//      .then(countDeleted => {
//        res.status(200).json(`Post ${req.post} was deleted.`);
//      })
//      .catch(err => {
//        res.status(500).json({ message: "internal Server Error" });
//      });
//  }
// });
// router.put("/:id", validatePost, validatePostId, (req, res) => {
//  const changes = req.body;
//  if (req.post) {
//    Posts.update(req.post, changes)
//      .then(post => {
//        res.status(201).json(post);
//      })
//      .catch(err => {
//        res.status(500).json({ message: "Error updating post" });
//      });
//  }
// });
// // custom middleware
// function validatePostId(req, res, next) {
//  const id = req.params.id;
//  Posts.getById(id)
//    .then(post => {
//      if (!post) {
//        res.status(404).json(`Post with ${id} does not exist.`);
//      } else {
//        req.post = id;
//        next();
//      }
//    })
//    .catch(err => {
//      res.status(500).json({ message: "Error updating post" });
//    });
// }
module.exports = router;