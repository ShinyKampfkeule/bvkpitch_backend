const express = require('express');
const Users = require("../postgres/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    return sha256.update(password).digest('base64')
}

router.post('/auth', async function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    const hashed_password = getHashedPassword(password)
    if (username && hashed_password) {
        const results = await Users.findOne({where:{username: username, password: hashed_password}})
            if (results.dataValues !== null) {
                const id = results.dataValues.id
                const token = jwt.sign({id}, 'SECRET_KEY', {
                    expiresIn: 1200,
                })
                // request.session.user = results

                response.setHeader('Content-Type', 'application/json')
                response.json({auth: true, token: token, result: results.dataValues});
            } else {
                response.setHeader('Content-Type', 'application/json')
                response.json({auth: false, message: 'Incorrect Username or Password. Try again!'});
            }
            response.end();
    } else {
        response.setHeader('Content-Type', 'application/json')
        response.json({auth: false, message: 'no user exists'});
        response.end();
    }
});

module.exports = router