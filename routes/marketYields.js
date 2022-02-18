const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const jsonFile = require('../searchResult.json')

const result = jsonFile.searchObject


router.post('/', async function(req, res) {
    try {
        fetch('https://api.21re.de/v3/yields/query', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer FP14A204OJQ3TPUQ8A1GA4EFV6I1NRV8S50ODCT2IRO15JPA7M8GCB1R',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({"address":{"country":`${result.context[3].short_code.toUpperCase()}`,"locality":`${result.context[2].text}`,"postalCode":`${result.context[0].text}`,"route":`${result.text}`,"streetNumber":`${result.address}`,"location":{"lat":52.51235,"lng":13.39734}}})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                res.json({data: data})
            })
    } catch (e) {
    }
});

module.exports = router;