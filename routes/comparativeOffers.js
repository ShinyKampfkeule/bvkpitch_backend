const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')
const Compareable_Offers = require("../postgres/Compareable-Offers");

const place_name = ["","","","","","","","","","","","","","","","","","", ""]

router.post('/', async function(req, res) {
    try {
        let result
        if(req.body.id !== undefined){
            await fs.readFile(`${req.body.id}.json`, (err, data) => {
                if (err) throw err;
                let json = JSON.parse(data);
                result = json.searchObject
                if(place_name[req.body.id] === result.place_name){
                    res.json({changed: false})
                    return
                }
                place_name[req.body.id] = result.place_name
                fetch('https://api.21re.de/v3/comparables/query', {
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
                        "radius": 50000,
                        "offerType": "rent",
                        "objectType": "apartment",
                        "area": {"from": 40, "to": 90},
                        "year": {"from": 1980, "to": 2050},
                        "rooms": {"from": 2, "to": 5},
                        "offerDate": {"from": {"year": 2019, "quarter": 1}, "to": {"year": 2052, "quarter": 4}}
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        Compareable_Offers.destroy({
                            where: {user_id: req.body.id}
                        })
                        data.items.map(async (e) => {
                            const dataToUpdate = {
                                user_id: req.body.id,
                                offer_date: e.offerDate,
                                sqm_price_cents: e.sqmPriceCents,
                                build_year: e.buildYear,
                                area: e.area,
                                rooms: e.rooms,
                                route: e.route,
                                street_number: e.streetNumber
                            }
                            await Compareable_Offers.create(dataToUpdate)
                        })
                        res.json({changed: true, data: data})
                    })
            })
        }
    } catch (e) {
    }
});

module.exports = router;