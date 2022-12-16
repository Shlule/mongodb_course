const express = require('express');
const Student = require('../models/student');
const router = new express.Router()
const Stuff = require('../models/stuff')
const StuffType = require('../models/stuffType')


// Create a stuff to add in my regie
router.post('/stuff', async (req,res)=>{
    const stuff = Stuff(req.body)
    try{
        await stuff.save();
        res.status(202).send(stuff);
    } catch(error) {
        res.status(400).send(error);
    }
});


//get all stuff in my regie
router.get('/stuff', async (req,res)=>{
    try{
        const stuffs = await Stuff.find({})
        res.status(200).send(stuffs);
    } catch(error){
        res.status(500).send()
    }
});

// get stuff by id
router.get('/stuff/:id', async(req,res)=>{
    const _id = req.params.id;
    try{
        const stuff = await Stuff.findById(_id);
        if(!stuff){
            return res.status(404).send();
        }
        res.status(200).send(stuff)
    }catch(error){
        res.status(500).send()
    }
});

// update by id with a new complete body
router.patch('stuff/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','type','description','isAssigned'];
    const isValid = updates.every(update => allowedUpdates.includes(update));
    if(!isValid){
        res.status(400).send()
    }
    try{
        const stuff = await Stuff.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true});
        if(!stuff){
            return res.status(404).send();
        }
        res.send(stuff);
    }catch(error){
        res.status(400).send();
    }
});

//delete stuff by id
router.delete('/stuff/:id', async (req,res)=>{
    try{
        const stuff = await Stuff.findByIdAndDelete(req.params.id);
        if(!stuff){
            return res.status(404).send()
        }
        res.send(student);
    }catch(error){
        res.status(500).send();
    }
});

module.exports = router