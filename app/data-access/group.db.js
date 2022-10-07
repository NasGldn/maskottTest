const db = require("../models");
const Group = db.groups;
const Student = db.students;
const utils = require("./utils.db")


// Create and Save a new Group
exports.create = async (group) => {
  // Save group in the database
  try {
    const data = await Group.create(group)
    return data
  } catch (e) {
   throw {
      message: e.message || "Some error occurred while creating the Group.",
      status: 500
    }
  }

};

// Retrieve all Groups from the database.
exports.findAll = async (query) => {
  const whereConditions = utils.parseGroupQuery(query) ;

  try {
    const data = await Group.findAll({
      where: whereConditions,
      include: [
        {
          model: Student,
          as: "students",
          attributes: ["id", "firstname", "surname", "optionLatin", "optionMaths", "optionEco"],
          through: {
            attributes: [],
          },
        },
      ],
    })
    return data
  } catch (e) {
   throw {
      message: e.message || "Some error occurred while retrieving the Group.",
      status: 500
    }
  }
};


// Find a single Group with an id
exports.findOne = async (groupId) => {
  try {
    const data = await Group.findByPk(groupId, {
      include: [
        {
          model: Student,
          as: "students",
          attributes: ["id", "firstname", "surname", "optionLatin", "optionMaths", "optionEco"],
          through: {
            attributes: [],
          },
        },
      ],
    })
    if (data) {
      return data
    } else {
      throw {
        message: `Cannot find Group with id=${groupId}.`,
        status: 500
      }
    }
  } catch (e) {
   throw {
      message: e.message || "Error retrieving Group with id=" + groupId,
      status: 500
    }
  }
};

// Update a Group by the id in the request
exports.update = async (groupId, group) => {
  try{
    const num = await Group.update(group, {
      where: { id: groupId }
    })
    if (num == 1) {
      return {
        message: "Group was updated successfully."
      };
    } else {
      throw {
        message: `Cannot update Group with id=${id}. Maybe Group was not found or req.body is empty!`,
        status: 500
      };
    }
  } catch (e) {
    throw {
      message:  e.message || "Error updating Group with id=" + id,
      status: 500
    }
  };
}

// Delete a Group with the specified id in the request
exports.delete = async (groupId) => {
  try {
    const num = await Group.destroy({
      where: { id: groupId }
    })
    if (num == 1) {
      return {
        message: "Group was deleted successfully!"
      }
    } else {
      throw {
        message: `Cannot delete Group with id=${groupId}. Maybe Group was not found!`,
        status: 500
      }
    }
  } catch (e) {
   throw {
      message: e.message || "Could not delete Group with id=" + id,
      status: 500
    }
  }
}

// Delete all Groups from the database.
exports.deleteAll = async () => {
  try {
    const num = await Group.destroy({
      where: {},
      truncate: false
    })
    return { message: `${num} Groups were deleted successfully!` }
  } catch (e) {
   throw {
      message:  e.message || "Some error occurred while removing all Groups.",
      status: 500
    }
  }
};

// add a student to a Group
exports.addStudent = async (groupId, studentId) => {
  try {
    const group = await Group.findByPk(groupId)
    if (group) {
      const student = await Student.findByPk(studentId)
      if (student) {
        const data = await group.addStudent(student)
        return { message: `>> ${data.length} students (id=${data[0].studentId}) has been added to Group id=${data[0].groupId}`};
      } else {
        throw {
          message: `Cannot find Student with id=${studentId}.`,
          status: 500
        };
      }    
    } 
    else {
      throw {
        message: `Cannot find Group with id=${groupId}.`,
        status: 500
      }
    }

  } catch (e) {
   throw {
      message: e.message || "Error while adding Student to Group",
      status: 500
    }
  }
};

// remove student from a greoup
exports.removeStudent = async (groupId, studentId) => {
  try {
    const group = await Group.findByPk(groupId)
    if (group) {
      const student = await Student.findByPk(studentId)
      if (student) {
        const num = await group.removeStudent(student)
        return { message: `>> ${num} students (id=${student.id}) has been removed from Group id=${group.id}`};
      } else {
        throw {
          message: `Cannot find Student with id=${studentId}.`,
          status: 500
        };
      }    
    } 
    else {
      throw {
        message: `Cannot find Group with id=${groupId}.`,
        status: 500
      }
    }

  } catch (e) {
   throw {
      message: e.message || "Error while adding Student to Group",
      status: 500
    }
  }
};
