const express = require('express');
const Users = require("../postgres/User");
const crypto = require("crypto");
const Seat = require("../postgres/Seat");
const router = express.Router();

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

router.post('/', async (req, res) => {
    const {seat} = req.body
    const {id} = req.body

    const seatResult = await Seat.findOne({where: {id: seat}})
    if(seatResult.dataValues.is_free){
        await Users.update({seatplace: seat}, {where:{id: id}})
        res.json({saved: true})
    }
    else {
        res.json({saved: false, message: "This seat is already occupied."})
    }
})

router.post('/changepassword', async (req, res) => {
    const {currentPW, newPW, id} = req.body

    const currentPWHashed = getHashedPassword(currentPW)

    const user = await Users.findOne({where: {id: id}})
    if(user.dataValues.password === currentPWHashed){
        const newPWHashed = getHashedPassword(newPW)
        await Users.update({password: newPWHashed}, {where: {id: id}})
        res.json({saved: true})
    }else {
        res.json({saved: false, message: "Password is wrong."})
    }

})

router.get('/seats', async (req, res) => {
    try{
        const result = await Seat.findAll({where:{is_free: true, location: 'ber'}})
        res.json({result: result})
    }catch (e) {
        console.log(e)
    }
})

module.exports = router