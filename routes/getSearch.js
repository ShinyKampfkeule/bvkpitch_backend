const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res) => {
    if ((req.body.makro.length < 4) || (req.body.mikro.length < 4)) {
        res.send({message: "error"})
    } else {
        let data = JSON.stringify(req.body,null, 2)
        fs.writeFileSync('searchResult.json', data);
        res.send({message: "okay"})
    }
})

module.exports = router;