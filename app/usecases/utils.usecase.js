exports.checkStudentLegitimity = (group, student) => {
    let optionLatin = false;
    let optionMaths = false;
    let optionEco = false;
    group.students.push(student);
    group.students.forEach(stud => {
      if (!optionLatin && stud.optionLatin){
        optionLatin = true
      };
      if (!optionMaths && stud.optionMaths){
        optionMaths = true
      };
      if (!optionEco && stud.optionEco){
        optionEco = true
      };
    });
  
    return [optionLatin, optionMaths, optionEco].filter(Boolean).length <= 2;
  }
  
exports.createRateStats = (students) => {
    let studentsRate = {}
    students.forEach(stud => {
      studentsRate[stud.groups.length] = 0
    });
    students.forEach(stud => {
      studentsRate[stud.groups.length] = studentsRate[stud.groups.length]+1
    });
  
    return studentsRate;
  }
  