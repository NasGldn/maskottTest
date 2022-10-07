module.exports = {
    HOST: "127.0.0.1",
    USER: "postgres",
    PASSWORD: "ba6db9306f61",
    DB: "students_db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };