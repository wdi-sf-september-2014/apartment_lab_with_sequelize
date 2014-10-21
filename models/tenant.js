"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    manager_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tenant.belongsTo(models.Manager, { foreignKey: 'manager_id'});
      }
    },
    instanceMethods: {
      getFullName: function() {
        return [this.firstname, this.lastname].join(' ');
      }
    }
  });

  return Tenant;
};
