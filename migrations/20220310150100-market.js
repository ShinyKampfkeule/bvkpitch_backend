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
  return db.createTable('market_yield', {
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
    office_city_top_min: 'int',
    office_city_top_max: 'int',
    office_city_top_avg: 'int',
    office_city_min: 'int',
    office_city_max: 'int',
    office_city_avg: 'int',
    office_neighborhood_min: 'int',
    office_neighborhood_max: 'int',
    office_neighborhood_avg: 'int',
    retail_city_top_min: 'int',
    retail_city_top_max: 'int',
    retail_city_top_avg: 'int',
    retail_city_min: 'int',
    retail_city_max: 'int',
    retail_city_avg: 'int',
    retail_neighborhood_min: 'int',
    retail_neighborhood_max: 'int',
    retail_neighborhood_avg: 'int',
    residential_city_top_min: 'int',
    residential_city_top_max: 'int',
    residential_city_top_avg: 'int',
    residential_city_min: 'int',
    residential_city_max: 'int',
    residential_city_avg: 'int',
    residential_neighborhood_min: 'int',
    residential_neighborhood_max: 'int',
    residential_neighborhood_avg: 'int',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
