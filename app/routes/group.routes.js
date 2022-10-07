module.exports = app => {
  const groups = require("../usecases/group.usecase.js");

  var router = require("express").Router();

  const utils = require("./utils.routes")
 

  // Create a new group
  router.post("/", async (req, res) => {
    utils.callController(await groups.create, [req.body], res)
  });

  // Retrieve all groups
  router.get("/", async (req, res) => {
    utils.callController(await groups.findAll, [], res)
  });
  
  // Retrieve a single group with id
  router.get("/:id", async (req, res) => {
    utils.callController(await groups.findOne, [req.params.id], res)
  });

  // Update a group with id
  router.put("/:id", async (req, res) => {
    groupId = req.params.id;
    group =  req.body;
    utils.callController(await groups.update, [groupId, group], res)
  });


  // Delete a group with id
  router.delete("/:id", async (req, res) => {
    utils.callController(await groups.delete, [req.params.id], res)
  });

  // Create a new group
  router.delete("/", async (req, res) => {
    utils.callController(await groups.deleteAll, [], res)
  });

  // add a  student to a group
  router.post("/:groupId/students/:studentId", async (req, res) => {
    utils.callController(await groups.addStudent, [req.params.groupId, req.params.studentId], res)
  });

  // remove a  student from a group
  router.delete("/:groupId/students/:studentId", async (req, res) => {
    utils.callController(await groups.removeStudent, [req.params.groupId, req.params.studentId], res)
  });
  

  app.use('/api/groups', router);
};