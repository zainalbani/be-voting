'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataCalon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  DataCalon.init({
    id_paslon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_ketua: DataTypes.STRING,
    nama_wakil_ketua: DataTypes.STRING,
    visi: DataTypes.STRING,
    misi: DataTypes.STRING,
    youtube_link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DataCalon',
    tableName: 'datacalon',
    timestamps: false,
  });
  return DataCalon;
};