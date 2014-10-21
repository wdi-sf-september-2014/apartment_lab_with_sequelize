"use strict";

module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    property: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Manager;
};
