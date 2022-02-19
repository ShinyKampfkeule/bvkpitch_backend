const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')

let topics = ["residential-apartment-rent", "residential-apartment-sale", "residential-house-rent", "residential-house-sale", "office", "retail"]

router.post('/location',  async function(req, res) {
    let result
    await fs.readFile('searchResult.json', (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        result = json.searchObject
        fetch('https://api.21re.de/v3/prices/location', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer FP14A204OJQ3TPUQ8A1GA4EFV6I1NRV8S50ODCT2IRO15JPA7M8GCB1R',
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
            .then((locData) => {
                res.json({locData: locData})
            })
    })
});

router.post('/unit', async function(req, res) {
    let fullArray = []
    let result
    await fs.readFile('searchResult.json', (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        result = json.searchObject
        topics.map((topic) => {
            fetch('https://api.21re.de/v3/prices/unit', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'authorization': 'Bearer FP14A204OJQ3TPUQ8A1GA4EFV6I1NRV8S50ODCT2IRO15JPA7M8GCB1R',
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
                    }, "unitType": `${topic}`, "constructionYear": 2022, "area": 80, "exclusiveness": "standard"
                })
            })
                .then((response) => response.json())
                .then(async (data) => {
                    let mlpObject = {key: topic, data: data}
                    fullArray.push(mlpObject)
                    if (fullArray.length === 6) {
                        res.json({unitData: fullArray})
                    }
                })
        })
    })
});

module.exports = router;