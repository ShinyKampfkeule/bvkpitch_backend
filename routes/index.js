const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')
const sequelize = require("../db");
const Users = require('../postgres/User')
const Address = require("../postgres/Address");
const Macro = require("../postgres/Macro");
const Micro = require("../postgres/Micro");

const place_name = ["","","","","","","","","","","","","","","","","","", ""]

router.get('/', async (req, res) => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  const allusers = await Users.findAll({
    attributes: ['id', 'name']
  })
  console.log("All users:", JSON.stringify(allusers, null, 2));
})

router.post('/', async function(req, res) {
  try {
    let result
    let makro
    let mikro
    await fs.readFile(`${req.body.id}.json`, (err, data) => {
      if (err) throw err;
      let json = JSON.parse(data);
      result = json.searchObject
      if(place_name[req.body.id] === result.place_name){
        res.json({changed: false})
        return
      }
      place_name[req.body.id] = result.place_name
      makro = json.makro
      mikro = json.mikro
      fetch('https://api.21re.de/v3/scores', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'authorization': 'Bearer J5P9OA6Q9LDDTG0EA10B6S8NU1CQ6J7K9G8TE9D6RLJ4042Q2GAJR37F',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          "address": {
            "country": `${result.context[3].short_code.toUpperCase()}`,
            "locality": `${result.context[2].text}`,
            "postalCode": `${result.context[0].text}`,
            "route": `${result.text}`,
            "streetNumber": `${result.address}`,
            "location": {"lat": result.center[1], "lng": result.center[0]},
          },
          "macro": [`${makro[0].name}`, `${makro[1].name}`, `${makro[2].name}`, `${makro[3].name}`],
          "micro": [`${mikro[0].name}`, `${mikro[1].name}`, `${mikro[2].name}`, `${mikro[3].name}`]
        })
      })
          .then((response) => response.json())
          .then(async (data) => {
            const dataToUpdate = {
              postal_code: data.address.postalCode,
              locality: data.address.locality,
              route: data.address.route,
              street_number: data.address.streetNumber,
              loc_lat: data.address.location.lat,
              loc_lng: data.address.location.lng
            }
            await Address.update(dataToUpdate, {
              where: {user_id: req.body.id}
            })

            await Macro.destroy({
              where: {user_id: req.body.id}
            })

            await Micro.destroy({
              where: {user_id: req.body.id}
            })

            await makro.map( async (e) => {
              await Macro.create({user_id: req.body.id, name: e.name, score: data.macro[e.name].score})
            })

            await mikro.map( async (e) => {
              await Micro.create({user_id: req.body.id, name: e.name, score: data.micro[e.name].score})
            })

            res.json({changed: true, data: data, makro: makro, mikro: mikro})
          })
    })
  } catch (e) {
  }
});

module.exports = router;