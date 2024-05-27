'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataPemilih extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  DataPemilih.init({
    nipd: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    otp: DataTypes.STRING,
    nama_siswa: DataTypes.STRING,
    kelas: DataTypes.STRING,
    daftar: DataTypes.INTEGER,
    nowa: DataTypes.STRING,
    nama_ibu: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    paslon_id: DataTypes.INTEGER,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'DataPemilih',
    tableName: 'datapemilih',
    timestamps: false,
  });
  return DataPemilih;
};