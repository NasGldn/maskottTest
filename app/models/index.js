const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./student.model.js")(sequelize, Sequelize.DataTypes);
db.groups = require("./group.model.js")(sequelize, Sequelize.DataTypes);

db.groups.belongsToMany(db.students, {
    through: "group_student",
    foreignKey: "groupId",
    as: "students"
})
db.students.belongsToMany(db.groups, {
    through: "group_student",
    foreignKey: "studentId",
    as: "groups",
});

module.exports = db;