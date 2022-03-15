const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')
const MLP_Unit = require("../postgres/MLP_Unit");
const MLP_Location = require("../postgres/MLP_Location");

let topics = ["residential-apartment-rent", "residential-apartment-sale", "residential-house-rent", "residential-house-sale", "office", "retail"]
const place_name = ["","","","","","","","","","","","","","","","","","", ""]

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
            .then(async (locData) => {
                const dataToUpdate = {
                    residential_rent_micro_min: locData['residentialRent'].micro.min,
                    residential_rent_micro_max: locData['residentialRent'].micro.max,
                    residential_rent_micro_avg: locData['residentialRent'].micro.avg,
                    residential_rent_macro_min: locData['residentialRent'].macro.min,
                    residential_rent_macro_max: locData['residentialRent'].macro.max,
                    residential_rent_macro_avg: locData['residentialRent'].macro.avg,
                    residential_sale_micro_min: locData['residentialSale'].micro.min,
                    residential_sale_micro_max: locData['residentialSale'].micro.max,
                    residential_sale_micro_avg: locData['residentialSale'].micro.avg,
                    residential_sale_macro_min: locData['residentialSale'].macro.min,
                    residential_sale_macro_max: locData['residentialSale'].macro.max,
                    residential_sale_macro_avg: locData['residentialSale'].macro.avg,
                    office_micro_min: locData['office'].micro.min,
                    office_micro_max: locData['office'].micro.max,
                    office_micro_avg: locData['office'].micro.avg,
                    office_macro_min: locData['office'].macro.min,
                    office_macro_max: locData['office'].macro.max,
                    office_macro_avg: locData['office'].macro.avg,
                    retail_micro_min: locData['retail'].micro.min,
                    retail_micro_max: locData['retail'].micro.max,
                    retail_micro_avg: locData['retail'].micro.avg,
                    retail_macro_min: locData['retail'].macro.min,
                    retail_macro_max: locData['retail'].macro.max,
                    retail_macro_avg: locData['retail'].macro.avg,
                }
                await MLP_Location.update(dataToUpdate, {
                    where: {user_id: req.body.id}
                })

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
                        let index_residential_house_sale = fullArray.findIndex(obj => {
                            return obj.key === 'residential_house_sale'
                        })
                        let residential_apartment_rent = fullArray.findIndex(obj => {
                            return obj.key === 'residential_apartment_rent'
                        })
                        let residential_apartment_sale = fullArray.findIndex(obj => {
                            return obj.key === 'residential_apartment_sale'
                        })
                        let office = fullArray.findIndex(obj => {
                            return obj.key === 'office'
                        })
                        let retail = fullArray.findIndex(obj => {
                            return obj.key === 'retail'
                        })
                        let residential_house_rent = fullArray.findIndex(obj => {
                            return obj.key === 'residential_house_rent'
                        })

                        const dataToUpdate = {
                            residential_house_sale_min: index_residential_house_sale === -1
                                                            ?fullArray[fullArray.length -1].data.min
                                                            :fullArray[index_residential_house_sale].data.min,
                            residential_house_sale_max: index_residential_house_sale === -1
                                                            ?fullArray[fullArray.length -1].data.max
                                                            :fullArray[index_residential_house_sale].data.max,
                            residential_house_sale_avg: index_residential_house_sale === -1
                                                            ?fullArray[fullArray.length -1].data.avg
                                                            :fullArray[index_residential_house_sale].data.avg,
                            residential_apartment_rent_min: residential_apartment_rent === -1
                                                                ? fullArray[fullArray.length -1].data.min
                                                                : fullArray[residential_apartment_rent].data.min,
                            residential_apartment_rent_max: residential_apartment_rent === -1
                                                                ? fullArray[fullArray.length -1].data.max
                                                                : fullArray[residential_apartment_rent].data.max,
                            residential_apartment_rent_avg: residential_apartment_rent === -1
                                                                ? fullArray[fullArray.length -1].data.avg
                                                                : fullArray[residential_apartment_rent].data.avg,
                            residential_apartment_sale_min: residential_apartment_sale === -1
                                                                ? fullArray[fullArray.length -1].data.min
                                                                : fullArray[residential_apartment_sale].data.min,
                            residential_apartment_sale_max: residential_apartment_sale === -1
                                                                ? fullArray[fullArray.length -1].data.max
                                                                : fullArray[residential_apartment_sale].data.max,
                            residential_apartment_sale_avg: residential_apartment_sale === -1
                                                                ? fullArray[fullArray.length -1].data.avg
                                                                : fullArray[residential_apartment_sale].data.avg,
                            office_min: office === -1
                                            ? fullArray[fullArray.length -1].data.min
                                            : fullArray[office].data.min,
                            office_max: office === -1
                                            ? fullArray[fullArray.length -1].data.max
                                            : fullArray[office].data.max,
                            office_avg: office === -1
                                            ? fullArray[fullArray.length -1].data.avg
                                            : fullArray[office].data.avg,
                            retail_min: retail === -1
                                            ? fullArray[fullArray.length -1].data.min
                                            : fullArray[retail].data.min,
                            retail_max: retail === -1
                                            ? fullArray[fullArray.length -1].data.max
                                            : fullArray[retail].data.max,
                            retail_avg: retail === -1
                                            ? fullArray[fullArray.length -1].data.avg
                                            : fullArray[retail].data.avg,
                            residential_house_rent_min: residential_house_rent === -1
                                                            ? fullArray[fullArray.length -1].data.min
                                                            : fullArray[residential_house_rent].data.min,
                            residential_house_rent_max: residential_house_rent === -1
                                                            ? fullArray[fullArray.length -1].data.max
                                                            : fullArray[residential_house_rent].data.max,
                            residential_house_rent_avg: residential_house_rent === -1
                                                            ? fullArray[fullArray.length -1].data.avg
                                                            : fullArray[residential_house_rent].data.avg,
                        }


                        await MLP_Unit.update(dataToUpdate, {
                            where: {user_id: req.body.id}
                        })
                        res.json({changed: true, unitData: fullArray})
                    }
                })
        })
    })
});

module.exports = router;