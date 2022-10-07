exports.callController = async (controllerFunction, params, res) => {
    try {
      data = await controllerFunction(...params)
      res.send(data);
    } catch (err) {
        console.error(err)
      res.status(err.status).send({
        message:
          err.message
      });
    }
  }  