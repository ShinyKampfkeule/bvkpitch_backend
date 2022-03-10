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
  return db.createTable('mlp-location', {
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
    residential_rent_micro_min: 'int',
    residential_rent_micro_max: 'int',
    residential_rent_micro_avg: 'int',
    residential_rent_macro_min: 'int',
    residential_rent_macro_max: 'int',
    residential_rent_macro_avg: 'int',
    residential_sale_micro_min: 'int',
    residential_sale_micro_max: 'int',
    residential_sale_micro_avg: 'int',
    residential_sale_macro_min: 'int',
    residential_sale_macro_max: 'int',
    residential_sale_macro_avg: 'int',
    office_micro_min: 'int',
    office_micro_max: 'int',
    office_micro_avg: 'int',
    office_macro_min: 'int',
    office_macro_max: 'int',
    office_macro_avg: 'int',
    retail_micro_min: 'int',
    retail_micro_max: 'int',
    retail_micro_avg: 'int',
    retail_macro_min: 'int',
    retail_macro_max: 'int',
    retail_macro_avg: 'int',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
