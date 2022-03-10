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
  return db.createTable('compareable-offers', {
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
    offer_date: 'string',
    sqm_price_cents: 'int',
    build_year: 'int',
    area: 'int',
    rooms: 'int',
    route: 'string',
    street_number: 'string'
  });
};

exports.down = function(db) {
  return db.dropDatabase('compareable-offers');
};

exports._meta = {
  "version": 1
};
