"use strict";

module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
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
