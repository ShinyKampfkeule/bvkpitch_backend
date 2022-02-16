var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

router.post('/', async function(req, res, next) {
    try {
        let address = req.body.data
        console.log(address)
        console.log('###########################')
        fetch('https://api.21re.de/v3/comparables/query', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Bearer FP14A204OJQ3TPUQ8A1GA4EFV6I1NRV8S50ODCT2IRO15JPA7M8GCB1R',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({"address":{"country":`${address.context[3].short_code.toUpperCase()}`,"locality":`${address.context[2].text}`,"postalCode":`${address.context[0].text}`,"route":`${address.text}`,"streetNumber":`${address.address}`,"location":{"lat":52.51235,"lng":13.39734}},"radius":1000,"offerType":"rent","objectType":"apartment","area":{"from":40,"to":90},"year":{"from":1980,"to":2000},"rooms":{"from":2,"to":5},"offerDate":{"from":{"year":2010,"quarter":1},"to":{"year":2010,"quarter":1}}})
        })
            .then((response) => response.json())
        console.log(response)
            .then((data) => {
                console.log(data)
                res.json({data: data})
            })
    } catch (e) {
    }
});

module.exports = router;