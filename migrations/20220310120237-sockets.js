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
  return db.createTable('sockets', {
    id: {type: 'string', primaryKey: true},
    socket: {type: 'string'},
    is_free: 'bool',
    location: 'string',
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
