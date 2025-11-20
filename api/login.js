import express from 'express';
import jwt from 'jsonwebtoken'
import {getAuthUser} from '../databases/authdb.js'
const router = express.Router();

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    let authUser = getAuthUser(username)

    if( authUser && (authUser.password === password)) {
        const token = jwt.sign({ username: username}, 'my_secret_key', {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign({ username: username}, 'my_secret_key', {
            expiresIn: '1d'
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
        .json({
            "username": username,
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": "1h"
        })

    } else {
        res.status(401).json( {"error": "Login failed"} )
    }
});

export default router;