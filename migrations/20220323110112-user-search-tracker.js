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
  return db.createTable('user_seat_tracker', {
    id: {type: "int", autoIncrement: true, primaryKey: true},
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
      }, primaryKey:true
    },
    seatplace: 'string',
    logged_in: {type: 'bigint'},
    logged_out: {type: 'bigint'},
    user_socket: 'string'
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
