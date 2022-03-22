const express = require('express');
const Users = require("../postgres/User");
const crypto = require("crypto");
const router = express.Router();

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

router.post('/', async (req, res) => {
    const {seat} = req.body
    const {id} = req.body
    console.log(seat)

    await Users.update({seatplace: seat}, {where:{id: id}})
    res.json({saved: true})
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

module.exports = router