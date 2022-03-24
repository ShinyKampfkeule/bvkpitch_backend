const DBMigrate = require("db-migrate");
const Users = require("./postgres/User");

let dbmigrate = DBMigrate.getInstance(true)

async function initDB(){
    await dbmigrate.up(process.env.DB_HOST)

    const usersArray = [
        {id: 1, name: 'Stephanie Kühn', username: 'stephanie.kuehn', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 2, name: 'Nina Heydecke', username: 'nina.heydecke', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 3, name: 'Tanya Pinto', username: 'tanya.pinto', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 4, name: 'Amir Fazli', username: 'amir.fazil', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 5, name: 'Huiwen Tang', username: 'huiwen.tang', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 6, name: 'Philip Köhler', username: 'philip.koehler', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 7, name: 'Martin Seitz', username: 'martin.seitz', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 8, name: 'Andreas Sielemann', username: 'andreas.sielemann', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 9, name: 'Albrecht von Witzendorff', username: 'albrecht.vonwitzdorff', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 10, name: 'Aaron Naveh', username: 'aaron.naveh', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 11, name: 'Laila Macintosh', username: 'laila.macintosh', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 12, name: 'Gudrun Heinz-Schmitt', username: 'gudrun.heinz-schmitt', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 13, name: 'Ümüt Erdem', username: 'uemuet.erdem', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 14, name: 'Doron Mogilev', username: 'doron.mogilev', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 15, name: 'Frauke Hoffmann', username: 'frauke.hoffmann',  password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 16, name: 'Natalia Fuhrmann', username: 'natalia.fuhrmann', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 17, name: 'Alice Gavish', username: 'alice.gavish', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 18, name: 'Amar Samadi', username: 'amar.samadi', password: 'cnwHumhIZ+KY8B7EMQ90sg+GOx6dFEQSB6ojMuCKGxg='},
        {id: 30, name: 'Dev', username: 'dev', password: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='}
    ]

    await Users.bulkCreate( usersArray, {
        ignoreDuplicates: true
    })
}

module.exports = initDB