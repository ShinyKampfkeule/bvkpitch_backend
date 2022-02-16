var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')

router.post('/', async function(req, res, next) {
  try {
    let address = req.body.data
    fetch('https://api.21re.de/v3/scores', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': 'Bearer FP14A204OJQ3TPUQ8A1GA4EFV6I1NRV8S50ODCT2IRO15JPA7M8GCB1R',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({"address":{"country":`${address.context[3].short_code.toUpperCase()}`,"locality":`${address.context[2].text}`,"postalCode":`${address.context[0].text}`,"route":`${address.text}`,"streetNumber":`${address.address}`,"location":{"lat":52.51235,"lng":13.39734}},"macro":["pop_sum_00", "gr_2y_unemp_rate", "purchasing_power_sum_00_per_capita", "pop_65_rate_00"],"micro":["v1_central", "v2_connect", "v2_kita", "v2_noise"]})
    })
        .then((response) => response.json())
        .then((data) => {
          res.json({data: data})
        })
  } catch (e) {
  }
});

module.exports = router;