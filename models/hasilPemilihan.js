'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HasilPemilihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  HasilPemilihan.init({
    paslon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jumlah_suara: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HasilPemilihan',
    tableName: 'hasilpemilihan',
    timestamps: false,
  });
  return HasilPemilihan;
};