const students= require("../data-access/student.db")
const groups= require("../data-access/group.db")

const utils = require("./utils.usecase")

exports.getStudentsRate = async () => {
  try {
    const studs = await students.findAll({})
    const data = utils.createRateStats(studs);
    return data
  } catch (err) {
    throw {
      message: err.message || `Error during statistics retrieving`,
      status: 500
    };  }
}

exports.getOldGroups = async () => {
  try {
    const oneYearAgoDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    const data = await groups.findAll({
      "beforeDate": oneYearAgoDate.toISOString().split('T')[0]
    })
    return data
  } catch (err) {
    throw {
      message: err.message || `Error during statistics retrieving`,
      status: 500
    };  }
}