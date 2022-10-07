const { Op } = require("sequelize");


exports.parseStudentQuery = (query)=> {
    const {search,gender, beforeDate, afterDate, optionLatin,optionMaths,optionEco} = query;
    const whereConditions = {};
    if (gender){
      whereConditions['gender']=gender;
    }
    if (optionLatin){
      whereConditions['optionLatin']=optionLatin;
    }
    if (optionMaths){
      whereConditions['optionMaths']=optionMaths;
    }
    if (optionEco){
      whereConditions['optionEco']=optionEco;
    }
    if (search){
      const likeCondition = {
        [Op.startsWith]: search
      }
      whereConditions['surname']=likeCondition;
    }  
    if (beforeDate && afterDate){
      const timeCondition = {
        [Op.and]: {
          [Op.lt]:beforeDate,
          [Op.gt]:afterDate
        }
      }
      whereConditions['birthDate']=timeCondition;
    }  
    else if (beforeDate){
      const timeCondition = {
        [Op.lt]:beforeDate,
      }
      whereConditions['birthDate']=timeCondition;    
    }  
    else if (afterDate){
      const timeCondition = {
        [Op.gt]:afterDate,
      }
      whereConditions['birthDate']=timeCondition;    
    }
    return whereConditions;
}

exports.parseGroupQuery = (query)=> {
    const {beforeDate} = query;
    const whereConditions = {};
   if (beforeDate){
      const timeCondition = {
        [Op.lt]:beforeDate,
      }
      whereConditions['createdAt']=timeCondition;    
    }  
    return whereConditions;
}