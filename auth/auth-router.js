const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require('../api/secret');

const Users = require("./auth-model");

router.post("/register", (req, res) => {
    let {username, password} = req.body;
    const hash = bcrypt.hashSync(password, 8);

    Users.add({username, password: hash})
        .then(saved => {
            res
                .status(201)
                .json(saved);
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res
                    .status(200)
                    .json({message: `Well helloooooooo, ${user.username}!`, token });
            } else {
                res
                    .status(401)
                    .json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json(error);
        });
});

function generateToken(user) {
    const payload = {
        username: user.username
    };
    const secrets = secret.jwtSecret;

    const options = {
        expiresIn: "1h"
    };
    return jwt.sign(payload, secrets, options);
}

module.exports = router;