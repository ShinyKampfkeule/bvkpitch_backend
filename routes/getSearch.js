const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
    console.log(req.body)
    let data = JSON.stringify(req.body, 2)
    fs.writeFileSync('searchResult.json', data);
    res.send("okay")
})

module.exports = router;