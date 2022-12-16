const express = require('express')
const router = new express.Router()
const Emprunt = require('../models/emprunt')
const Stuff = require('../models/stuff')
const Student = require('../models/student')
const { exists } = require('../models/student')


//create a new document in data base referencing wich student make the emprunt and wich stuff it take
//this update the stuff given to isAssigned=true

router.post('/emprunt', async (req,res)=>{
    const emprunt = Emprunt(req.body);
    try{
        const stuffRequested = await Stuff.findById(req.body.stuff)
        if(!stuffRequested.isAssigned){
            await emprunt.save()
            await Stuff.findByIdAndUpdate(stuffRequested._id, {isAssigned: true},{new: true, runValidators:true});
            return res.status(202).send(emprunt)

        }
        res.status(420).send("this stuff is already assigned")
    }catch(error){
        res.status(400).send(error)
    }
});


//get all emprunt
router.get('/emprunt', async(req,res)=>{
    try{
        const emprunts = await Emprunt.find({})
        res.status(200).send(emprunts);
    }catch(error){
        res.status(500).send();
    }
});

// get all Emprunt of one student
router.get('/emprunt/byStudentId', async(req,res)=>{
    try{
        const emprunts = await Emprunt.find({student: req.body.student})
        res.status(200).send(emprunts);
    }catch(error){
        res.status(500).send();
    }
});

//update the emprunt with an entire full request body
router.patch('/emprunt/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['loanDate', 'deliveryDate','student','stuff'];
    const isValid = updates.every(update => allowedUpdates.includes(update));
    if(!isValid){
        res.status(400).send()
    }
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
        if(!student){
            return res.status(404).send();
        }
        res.send(student);
    }catch(error){
        res.status(400).send();
    }
});

// delete emprunt and update stuff isAssigned: false
router.delete('/emprunt/:id', async (req,res)=>{
    try{
        
        const emprunt = await Emprunt.findById(req.params.id);
        if(!emprunt){
            return res.status(404).send()
        }

        const stuffDeliver = emprunt.stuff._id
        await Stuff.findByIdAndUpdate(stuffDeliver,{isAssigned: false}, {new: true, runValidators: true});
        await Emprunt.findByIdAndDelete(emprunt)
        res.send(emprunt)

    }catch(error){
        res.status(500).send();
    }
});


module.exports = router