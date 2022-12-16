const express = require('express');
const { findByIdAndDelete } = require('../models/stuffType');
const router = new express.Router();
const StuffType = require('../models/stuffType');


// create a stufftype to add in my regie like camera, light, etc. 
router.post('/stuffType', async (req,res)=>{
    const stuffType = StuffType(req.body);
    try{
        //verify if the stuffType already exist
        const stuffTypeTry = await StuffType.find({name : stuffType.name})
        if(stuffTypeTry.length == 0){
            await stuffType.save()
            return res.status(202).send(stuffType)
        }
        res.status(420).send("this stuff type already exist")
    } catch(error){
        res.status(400).send(error)
    }
});

// get all stuffType avaible
router.get('/stuffType', async(req,res)=>{
    try{
        const stuffType = await StuffType.find({})
        res.status(200).send(stuffType);
    } catch(error){
        res.status(500).send();
    }
});

// delete one stuffType by his id
router.delete('/stufftype/:id', async(req,res)=>{
    try{
        const stuffType = await StuffType.findByIdAndDelete(req.params.id);
        if(!stuffType){
            return res.status(404).send();
        }
        res.sratus(stuffType)  
    }catch(error){
        res.status(500).send();
    }
});

module.exports = router