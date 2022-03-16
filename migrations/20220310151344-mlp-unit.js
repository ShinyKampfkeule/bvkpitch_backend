'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('mlp_unit', {
    user_id: {
      type: 'int',
      notNull: false,
      foreignKey: {
        name: 'user_id_fk',
        table: 'users',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }, primaryKey: true
    },
    residential_house_sale_min: 'float',
    residential_house_sale_max: 'float',
    residential_house_sale_avg: 'float',
    residential_apartment_rent_min: 'float',
    residential_apartment_rent_max: 'float',
    residential_apartment_rent_avg: 'float',
    residential_apartment_sale_min: 'float',
    residential_apartment_sale_max: 'float',
    residential_apartment_sale_avg: 'float',
    office_min: 'float',
    office_max: 'float',
    office_avg: 'float',
    retail_min: 'float',
    retail_max: 'float',
    retail_avg: 'float',
    residential_house_rent_min: 'float',
    residential_house_rent_max: 'float',
    residential_house_rent_avg: 'float',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
