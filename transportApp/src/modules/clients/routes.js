const express = require('express');

const router        = express.Router();
const response      = require('../../network/response');
const controller    = require('./index');

router.get('/', allReg);
router.get('/:id', oneReg);
router.post('/',addReg);
router.put('/:id', delReg);

async function allReg(req,res,next) {
    try{
        const allReg = await controller.findAll();
        response.success(req, res, allReg, 200);
    }catch(err){
        next(err);
    }
};

async function oneReg(req,res,next) {
    try{
        const oneReg = await controller.find(req.params.id);
        response.success(req, res, oneReg, 200);
    }catch(err){
        next(err);
    }
};

async function addReg(req,res,next) {
    try{
        const addReg = await controller.add(req.body)
        if(req.body.Id == 0){
            mesage = 'Item added succesfully';
        }else{
            mesage = 'Item updated succesfully';
        }
        response.success(req, res, mesage, 201);
    }catch(err){
        next(err);
    }
};

async function delReg(req,res,next) {
    try{
        const delReg = await controller.del(req.params.id);
        response.success(req, res, 'Item deleted succesfully !!!', 200);
    }catch(err){
        next(err);
    }
};

module.exports = router;