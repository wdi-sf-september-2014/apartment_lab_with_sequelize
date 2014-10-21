"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    manager_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Tenant;
};
