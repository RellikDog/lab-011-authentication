'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');

/**
 * this function signs a user up by creating a new user, saving them to the db, creating a token and sending it back
 * @post
 * @param {ref} req - the request that the user has sent to the api.
 * @param {ref} res - the places to return the data to after the request is completed.
 * @param {fn} next - the next function in the path.
 */
authRouter.post('/signup', (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then( (user) => {
            req.token = user.generateToken();
            req.user = user;
            res.set('token', req.token);
            res.cookie('auth', req.token);
            res.send(req.token);
        }).catch(next);
});

authRouter.get('/signin', auth, (req, res, next) => {
    res.cookie('auth', req.token);
    res.send(req.token);
});

authRouter.get('/book', (req, res, next)=>{
   console.log(req);
});
module.exports = authRouter;