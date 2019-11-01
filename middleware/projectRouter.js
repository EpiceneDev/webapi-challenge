// const router = require('express').Router();
// const validateProjectId = require('./validateProjectId.js');
// const validateProject = require('./validateProject.js');

// // 5 update path for the require
// const Projects = require('../projects/projectModel.js');



// router.post('/', validateProject, (req, res) => {
//     const project = req.body;
//     Projects.insert(project)
//         .then(id => {
//             res.status(201).json(id);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 message: 'Error adding the project',
//             });
//     });
// });

// // router.getProjectActions('/:id/actions', (req, res) => {
// //     const action = { text: req.body.text, project_id: req.params.id };
// //     Projects.findById(req.params.id)
// //         .then(project => {
// //           if (project) {
// //             if (comment.text && comment.project_id) {
// //               projects.insertComment(comment)
// //                 .then(comment => {
// //                   res.status(201).json(comment)
// //                 })
// //               } else {
// //                 res.status(400).json({ errorMessage: "Please provide text for the comment."})
// //               }   
// //             } else {
// //               res.status(404).json({ message: "The project with the specified ID does not exist." })
// //             }
// //         })
// //         .catch(error => {
// //             console.log(error);
// //             res.status(500).json({ error: 'There was an error while saving the comment to the database' })
// //         })
// // });

// router.get('/', (req, res) => {

//   const query = req.query.id;

//   Projects.get(query)
//     .then(projects => {
//       res.status(200).json(projects);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the projects ',
//       });
//     });
// });

// router.get("/:id", validateProjectId, (req, res) => {
//   Projects.get(req.params.id)
//     .then(project => {
//         res.status(200).json(project);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the project",
//       });
//     });
// });


// router.delete('/:id', validateProjectId, (req, res) => {
//   Projects.remove(req.params.id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: 'The project has been nuked' });
//       } else {
//         res.status(404).json({ message: 'The project could not be found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error removing the project',
//       });
//     });
// });

// router.put('/:id', validateProjectId, validateProject, (req, res) => {
//   const changes = req.body;
//   const id = req.params.id;
//   Projects.update(id, changes)
//     .then(project => {
//       if (project) {
//         res.status(201).json(changes);
//       } else {
//         res.status(400).json({ errorMessage: "Please provide title and contents for the project." });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         error: "There was an error while saving the project to the database"
//       }).end();
//     });
// });


// // // GET	/api/projects/:id/comments	Returns an array of all the comment objects associated with the project with the specified id.
// // router.get('/:id/comments', (req, res) => {
// //     const projectId = req.params.id;
// //     projects.findCommentById(projectId)
// //         .then(comments => { 
// //             if (comments.length) {
// //                 res.status(201).json(comments);
// //             } else {
// //                 res.status(404).json({ errorMessage: "The project with the specified ID does not exist." });
// //             }
// //         })
// //         .catch(error => {
// //             console.log(error);
// //             res.status(404).json({ message: "There was an error while saving the comment to the database" })
// //         })
// // });


// // router.get('/:id/users', (req, res) => {

// // });

// // router.get('/:id/threads', (req, res) => {});

// // add an endpoint that returns all the messages for a project
// // add an endpoint for adding new message to a project

// // export default router; // ES Modules

// // function validatePostId(req, res, next) {
// //     const id = req.params.id;
// //     Posts.getById(id)
// //       .then(post => {
// //         if (!post) {
// //           res.status(404).json(`Post with ${id} does not exist.`);
// //         } else {
// //           req.post = id;
// //           next();
// //         }
// //       })
// //       .catch(err => {
// //         res.status(500).json({ message: "Error updating post" });
// //       });
// //    }

// module.exports = router;

const express = require("express");
const validateProjectId = require("./validateProjectId.js");
const validateProject = require("./validateProject.js");

const router = express.Router();
const Projects = require("../projects/projectModel.js");

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving projects." });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error to retriving project." });
    });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the user."
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.remove(id)
    .then(countDeleted => {
      if (countDeleted) {
        res
          .status(200)
          .json({ message: `Project with ${id} has been deleted`, id: id });
      } else {
        res.status(404).json({ errorMessage: "No project found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "internal Server Error" });
    });
});

router.put("/:id", validateProject, validateProjectId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Projects.update(id, changes)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating project" });
    });
});

module.exports = router;