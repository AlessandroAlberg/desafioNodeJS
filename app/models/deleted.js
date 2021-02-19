module.exports = (sequelize, DataTypes) => {
    const Deleted = sequelize.define('Deleted', {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      createdAt: DataTypes.DATE
    });
  
    return Deleted;
}