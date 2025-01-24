const express = require('express');

const router        = express.Router();
const response      = require('../../network/response');
const controller    = require('./index');

router.get('/login', login);

async function login(req,res,next) {
    try{
        const token = await controller.login(req.body.user, req.body.password);
        response.success(req, res, token, 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;