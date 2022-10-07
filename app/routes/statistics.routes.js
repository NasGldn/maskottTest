module.exports = app => {
    const statistics = require("../usecases/statistics.usecase.js");
  
    var router = require("express").Router();
  
    const utils = require("./utils.routes")
   
    router.get("/students", async (req, res) => {
      utils.callController(await statistics.getStudentsRate, [], res)
    });

    router.get("/groups", async (req, res) => {
        utils.callController(await statistics.getOldGroups, [], res)
    });
          
  
    app.use('/api/statistics', router);
  };