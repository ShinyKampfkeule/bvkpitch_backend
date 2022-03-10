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
  return db.createTable('mlp-unit', {
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
    residential_house_sale_min: 'int',
    residential_house_sale_max: 'int',
    residential_house_sale_avg: 'int',
    residential_apartment_rent_min: 'int',
    residential_apartment_rent_max: 'int',
    residential_apartment_rent_avg: 'int',
    residential_apartment_sale_min: 'int',
    residential_apartment_sale_max: 'int',
    residential_apartment_sale_avg: 'int',
    office_min: 'int',
    office_max: 'int',
    office_avg: 'int',
    retail_min: 'int',
    retail_max: 'int',
    retail_avg: 'int',
    residential_house_rent_min: 'int',
    residential_house_rent_max: 'int',
    residential_house_rent_avg: 'int',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
