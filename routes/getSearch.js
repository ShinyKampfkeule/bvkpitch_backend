const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
    let data = JSON.stringify(req.body,null, 2)
    fs.writeFileSync('searchResult.json', data);
    res.send("okay")
})

module.exports = router;