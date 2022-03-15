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
  return db.createTable('mlp_location', {
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
      }
    },
    residential_rent_micro_min: 'float',
    residential_rent_micro_max: 'float',
    residential_rent_micro_avg: 'float',
    residential_rent_macro_min: 'float',
    residential_rent_macro_max: 'float',
    residential_rent_macro_avg: 'float',
    residential_sale_micro_min: 'float',
    residential_sale_micro_max: 'float',
    residential_sale_micro_avg: 'float',
    residential_sale_macro_min: 'float',
    residential_sale_macro_max: 'float',
    residential_sale_macro_avg: 'float',
    office_micro_min: 'float',
    office_micro_max: 'float',
    office_micro_avg: 'float',
    office_macro_min: 'float',
    office_macro_max: 'float',
    office_macro_avg: 'float',
    retail_micro_min: 'float',
    retail_micro_max: 'float',
    retail_micro_avg: 'float',
    retail_macro_min: 'float',
    retail_macro_max: 'float',
    retail_macro_avg: 'float',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
