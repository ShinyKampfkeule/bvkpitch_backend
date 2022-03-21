const express = require('express');
const Users = require("../postgres/User");
const router = express.Router();

router.post('/', async (req, res) => {
    const {seat} = req.body
    const {id} = req.body
    console.log(seat, id)

    await Users.update({seatplace: seat}, {where: {id: id}})
    res.json({saved: true})
})

module.exports = router