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
  return db.createTable('search_tracker', {
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
    postal_code: 'string',
    locality: 'string',
    route: 'string',
    street_number: 'string',
    loc_lat: 'float',
    loc_lng: 'float',
    date: {type: 'string', length: 255}
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
