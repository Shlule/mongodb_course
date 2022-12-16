const mongoose = require('mongoose')
const StuffType = require('./stuffType')

const StuffSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'StuffType'
    },
    description:{
        type: String,
        trim: true
    },
    isAssigned:{
        type: Boolean,
        required: true
    }
    

})

const Stuff = mongoose.model('Stuff', StuffSchema)
module.exports = Stuff