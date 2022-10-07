module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("group", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    });
  
    return Group;
  };