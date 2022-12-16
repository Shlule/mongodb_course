const mongoose = require('mongoose');
const validator = require('validator');

const EmpruntSchema = new mongoose.Schema({
    loanDate:{
        type: Date,
        required: true
    },

    deliveryDate: {
        type: Date,
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required: true
    },
    stuff:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Stuff',
        required: true
    }
})

const Emprunt = mongoose.model('Emprunt',EmpruntSchema)

module.exports = Emprunt