const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')
const Market = require("../postgres/Market");
const place_name = ["","Pyrmonter Straße 66a, 33699 Bielefeld, Germany","","","","","","","","","","","","","","","","", ""]

router.post('/', async function(req, res) {
    try {
        let result
        await fs.readFile(`${req.body.id}.json`, (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            result = json.searchObject
            if(place_name[req.body.id] === result.place_name){
                res.json({changed: false})
                return
            }
            place_name[req.body.id] = result.place_name
            fetch('https://api.21re.de/v3/yields/query', {
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
                    }
                })
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.code === 400) {
                        res.json({data: data.code})
                    } else {
                        const dataToUpdate = {
                            office_city_top_min: data['office']['cityTop'].min,
                            office_city_top_max: data['office']['cityTop'].max,
                            office_city_top_avg: data['office']['cityTop'].avg,
                            office_city_min: data['office']['city'].min,
                            office_city_max: data['office']['cityTop'].max,
                            office_city_avg: data['office']['cityTop'].avg,
                            office_neighborhood_min: data['office']['neighborhood'].min,
                            office_neighborhood_max: data['office']['neighborhood'].max,
                            office_neighborhood_avg: data['office']['neighborhood'].avg,
                            retail_city_top_min: data['retail']['cityTop'].min,
                            retail_city_top_max: data['retail']['cityTop'].max,
                            retail_city_top_avg: data['retail']['cityTop'].avg,
                            retail_city_min: data['retail']['city'].min,
                            retail_city_max: data['retail']['city'].max,
                            retail_city_avg: data['retail']['city'].avg,
                            retail_neighborhood_min: data['retail']['neighborhood'].min,
                            retail_neighborhood_max: data['retail']['neighborhood'].max,
                            retail_neighborhood_avg: data['retail']['neighborhood'].avg,
                            residential_city_top_min: data['residential']['cityTop'].min,
                            residential_city_top_max: data['residential']['cityTop'].max,
                            residential_city_top_avg: data['residential']['cityTop'].avg,
                            residential_city_min: data['residential']['city'].min,
                            residential_city_max: data['residential']['city'].max,
                            residential_city_avg: data['residential']['city'].avg,
                            residential_neighborhood_min: data['residential']['neighborhood'].min,
                            residential_neighborhood_max: data['residential']['neighborhood'].max,
                            residential_neighborhood_avg: data['residential']['neighborhood'].avg,
                        }
                        await Market.update(dataToUpdate, {
                            where: {user_id: req.body.id}
                        })
                        res.json({changed: true, data: data})
                    }
                })
        })
    } catch (e) {
    }
});

module.exports = router;