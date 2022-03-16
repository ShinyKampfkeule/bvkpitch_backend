const DBMigrate = require("db-migrate");

let dbmigrate = DBMigrate.getInstance(true)
await dbmigrate.up(process.env.DB_HOST)