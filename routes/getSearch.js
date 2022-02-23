const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/',  (req, res) => {
    console.log(req.body)
    // if ((req.body.makro.length < 4) || (req.body.mikro.length < 4)) {
    //     res.send({message: "error"})
    // } else {
    let data = JSON.stringify(req.body, null, 2)
        // fs.writeFileSync('searchResult2.json', data);
    try {
        fs.writeFileSync(`${req.body.id}.json`, data)
        console.log('yeah')
    } catch (err) {
        console.error(err)
    }
    // }
})

module.exports = router;