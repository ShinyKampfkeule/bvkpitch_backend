const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')

let topics = ["residential-apartment-rent", "residential-apartment-sale", "residential-house-rent", "residential-house-sale", "office", "retail"]
const place_name = ["","Pyrmonter Straße 66a, 33699 Bielefeld, Germany","","","","","","","","","","","","","","","","", ""]

router.post('/location',  async function(req, res) {
    let result
    await fs.readFile(`${req.body.id}.json`, (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        result = json.searchObject
        console.log(place_name[req.body.id] === result.place_name)
        if(place_name[req.body.id] === result.place_name){
            res.json({changed: false})
            return
        }
        place_name[req.body.id] = result.place_name
        fetch('https://api.21re.de/v3/prices/location', {
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
            .then((locData) => {
                console.log("Locdata: ", locData)
                res.json({changed: true, locData: locData})
            })
    })
});

router.post('/unit', async function(req, res) {
    // res.set({
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    //     Connection: "keep-alive",
    //
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers":
    //         "Origin, X-Requested-With, Content-Type, Accept",
    // })

    let fullArray = []
    let result
    await fs.readFile(`${req.body.id}.json`, (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        result = json.searchObject
        if(place_name[req.body.id] === result.place_name){
            res.json({changed: false})
            return
        }
        // place_name[req.body.id] = result.place_name
        topics.map((topic) => {
            fetch('https://api.21re.de/v3/prices/unit', {
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
                    }, "unitType": `${topic}`, "constructionYear": 2022, "area": 80, "exclusiveness": "standard"
                })
            })
                .then((response) => response.json())
                .then(async (data) => {
                    let mlpObject = {key: topic, data: data}
                    fullArray.push(mlpObject)
                    if (fullArray.length === 6) {
                        console.log('Fullarray: ', fullArray)
                        res.json({changed: true, unitData: fullArray})
                    }
                })
        })
    })
});

module.exports = router;