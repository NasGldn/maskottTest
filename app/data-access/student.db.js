const db = require("../models");
const Student = db.students;
const Group = db.groups;
const utils = require("./utils.db")

// Create and Save a new Student
exports.create = async (student) => {
  // Save student in the database
  try {
    const data = await Student.create(student)
    return data
  } catch (e) {
   throw {
      message: e.message || "Some error occurred while creating the student.",
      status: 500
    }
  }

};

// Retrieve all Students from the database.
exports.findAll = async (query) => {
  const whereConditions = utils.parseStudentQuery(query) ;

  try {
    const data = await Student.findAll({
      where: whereConditions,
      include: [
        {
          model: Group,
          as: "groups",
          attributes: ["id", "name", "isActive"],
          through: {
            attributes: [],
          },
        },
      ],
    })
    return data
  } catch (e) {
   throw {
      message: e.message || "Some error occurred while retrieving the student.",
      status: 500
    }
  }
};


// Find a single Student with an id
exports.findOne = async (studentId) => {
  try {
    const data = await Student.findByPk(studentId)
    if (data) {
      return data
    } else {
      throw {
        message: `Cannot find Student with id=${studentId}.`,
        status: 500
      }
    }
  } catch (e) {
   throw {
      message: e.message || "Error retrieving Student with id=" + studentId,
      status: 500
    }
  }
};

// Update a Student by the id in the request
exports.update = async (studentId, student) => {
  try{
    const num = await Student.update(student, {
      where: { id: studentId }
    })
    if (num == 1) {
      return {
        message: "Student was updated successfully."
      };
    } else {
      throw {
        message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
        status: 500
      };
    }
  } catch (e) {
    throw {
      message:  e.message || "Error updating Student with id=" + id,
      status: 500
    }
  };
}

// Delete a Student with the specified id in the request
exports.delete = async (studentId) => {
  try {
    const num = await Student.destroy({
      where: { id: studentId }
    })
    if (num == 1) {
      return {
        message: "Student was deleted successfully!"
      }
    } else {
      throw {
        message: `Cannot delete Student with id=${studentId}. Maybe Student was not found!`,
        status: 500
      }
    }
  } catch (e) {
   throw {
      message: e.message || "Could not delete Student with id=" + id,
      status: 500
    }
  }
}

// Delete all Students from the database.
exports.deleteAll = async () => {
  try {
    const num = await Student.destroy({
      where: {},
      truncate: false
    })
    return { message: `${num} Students were deleted successfully!` }
  } catch (e) {
   throw {
      message:  e.message || "Some error occurred while removing all Students.",
      status: 500
    }
  }
};
