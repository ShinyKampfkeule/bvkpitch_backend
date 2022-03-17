const DBMigrate = require("db-migrate");
const Users = require("./postgres/User");

let dbmigrate = DBMigrate.getInstance(true)

async function initDB(){
    await dbmigrate.up(process.env.DB_HOST)

    const usersArray = [
        {id: 1, name: 'Stephanie Kühn'},
        {id: 2, name: 'Nina Heydecke'},
        {id: 3, name: 'Tanya Pinto'},
        {id: 4, name: 'Amir Fazli'},
        {id: 5, name: 'Huiwen Tang'},
        {id: 6, name: 'Philip Köhler'},
        {id: 7, name: 'Martin Seitz'},
        {id: 8, name: 'Andreas Sielemann'},
        {id: 9, name: 'Albrecht von Witzendorff'},
        {id: 10, name: 'Aaron Naveh'},
        {id: 11, name: 'Laila Macintosh'},
        {id: 12, name: 'Gudrun Heinz-Schmitt'},
        {id: 13, name: 'Ümüt Erdem'},
        {id: 14, name: 'Doron Mogilev'},
        {id: 15, name: 'Frauke Hoffmann'},
        {id: 16, name: 'Natalia Fuhrmann'},
        {id: 17, name: 'Alice Gavish'},
        {id: 18, name: 'Amar Samadi'},
    ]

    await Users.bulkCreate( usersArray, {
        ignoreDuplicates: true
    })
}

module.exports = initDB