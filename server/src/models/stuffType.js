const mongoose = require('mongoose');

const StuffTypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
});

const StuffType = mongoose.model('StuffType',StuffTypeSchema)
module.exports = StuffType