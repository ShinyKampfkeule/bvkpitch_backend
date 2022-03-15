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
    office_city_top_min: 'float',
    office_city_top_max: 'float',
    office_city_top_avg: 'float',
    office_city_min: 'float',
    office_city_max: 'float',
    office_city_avg: 'float',
    office_neighborhood_min: 'float',
    office_neighborhood_max: 'float',
    office_neighborhood_avg: 'float',
    retail_city_top_min: 'float',
    retail_city_top_max: 'float',
    retail_city_top_avg: 'float',
    retail_city_min: 'float',
    retail_city_max: 'float',
    retail_city_avg: 'float',
    retail_neighborhood_min: 'float',
    retail_neighborhood_max: 'float',
    retail_neighborhood_avg: 'float',
    residential_city_top_min: 'float',
    residential_city_top_max: 'float',
    residential_city_top_avg: 'float',
    residential_city_min: 'float',
    residential_city_max: 'float',
    residential_city_avg: 'float',
    residential_neighborhood_min: 'float',
    residential_neighborhood_max: 'float',
    residential_neighborhood_avg: 'float',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
