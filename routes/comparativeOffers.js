const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')

const place_name = ["","Pyrmonter Straße 66a, 33699 Bielefeld, Germany","","","","","","","","","","","","","","","","", ""]

router.post('/', async function(req, res) {
    try {
        let result
        console.log(req.body)
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
                        "year": {"from": 1980, "to": 2030},
                        "rooms": {"from": 2, "to": 5},
                        "offerDate": {"from": {"year": 2019, "quarter": 1}, "to": {"year": 2022, "quarter": 4}}
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        res.json({changed: true, data: data})
                    })
            })
        }
    } catch (e) {
    }
});

module.exports = router;