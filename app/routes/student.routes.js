module.exports = app => {
    const students = require("../usecases/student.usecase.js");
  
    var router = require("express").Router();

    const utils = require("./utils.routes")
  

    // Create a new student
    router.post("/", async (req, res) => {
      utils.callController(await students.create, [req.body], res)
    });

    // Retrieve all students
    router.get("/", async (req, res) => {
      utils.callController(await students.findAll, [req.query], res)
    });
    
    // Retrieve a single student with id
    router.get("/:id", async (req, res) => {
      utils.callController(await students.findOne, [req.params.id], res)
    });
  
    // Update a student with id
    router.put("/:id", async (req, res) => {
      studentId = req.params.id;
      student =  req.body;
      utils.callController(await students.update, [studentId, student], res)
    });

  
    // Delete a student with id
    router.delete("/:id", async (req, res) => {
      utils.callController(await students.delete, [req.params.id], res)
    });

    // Create a new student
    router.delete("/", async (req, res) => {
      utils.callController(await students.deleteAll, [], res)
    });

    app.use('/api/students', router);
  };