const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    age: {
        type: Number,
        default: 20,
        validate(value){
            if(value < 1){
                throw new Error('Age must be strictly positive')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        min: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ('Password is not valid') 
            }
        }
    }

})
const Student = mongoose.model('Student',studentSchema)

module.exports = Student