module.exports = (sequelize, dataTypes) => {
    const Student = sequelize.define("student", {
      firstname: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true
      },
      birthDate: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: dataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      optionLatin: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
      },
      optionMaths: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
      },
      optionEco: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
      }
    });
  
    return Student;
  };