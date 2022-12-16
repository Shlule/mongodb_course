const express = require('express');
const router = new express.Router()
const Student = require('../models/student');



router.post('/student', async (req,res)=> {
    const student = Student(req.body);
    try{
        // verify if the student already exist
        const studentTry = await Student.find({email: student.email})
        if(studentTry.length == 0){
            await student.save()
            return res.status(202).send(user)
        }
        res.status(420).send("this student already exist");
    } catch(error){
        res.status(400).send(error);
    }
});

router.get('/student', async (req, res) => {
    try{
        const students = await Student.find({})
        res.status(200).send(students);
    }catch(error){
        res.status(500).send();
    }
});

router.get('/student/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
        const student = await Student.findById(_id);
        if(!student){
            return res.status(404).send();
        }
        res.status(200).send(student);
    }catch(error){
        res.status(500).send()
    }
});

router.patch('/student/:id', async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email','password','age'];
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

router.delete('student/:id', async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).send();
        
        }
        res.send(student);

    }catch(error){
        res.status(500).send();
    }
});

module.exports = router