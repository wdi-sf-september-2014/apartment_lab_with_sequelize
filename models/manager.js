"use strict";

module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
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
