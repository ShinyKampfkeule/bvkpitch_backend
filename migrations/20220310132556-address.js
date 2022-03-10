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
  return db.createTable('address', {
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
    loc_lat: 'int',
    loc_lng: 'int'
  });
};

exports.down = function(db) {
  return db.dropDatabase('address');
};

exports._meta = {
  "version": 1
};